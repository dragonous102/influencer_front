import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CircularProgress } from '@mui/material';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';

import { uploads } from 'src/api/files';

import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------
export default function FileManagerNewFolderDialog({
  title = 'Upload Files',
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  //
  folderName,
  onChangeFolderName,
  handleUploadSuccess,
  ...other
}) {
  const [files, setFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, SetLoading] = useState(false);
  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      let newFiles = [];

      newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleUpload = async () => {
    SetLoading(true);
    let { isError, fileNames } = await uploads(files);
    SetLoading(false);
    if (isError) {
      enqueueSnackbar('some issues happened in uplods');
    } else {
      enqueueSnackbar('success uploads');
    }
    handleUploadSuccess(fileNames);
    onClose();
    console.info('ON UPLOAD');
  };

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <>
        {isLoading ? (
          <Stack
            sx={{ display: 'flex', margin: 'auto', alignItems: 'center', width: '100%', py: 3 }}
          >
            <CircularProgress />
          </Stack>
        ) : (
          <>
            <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
              {(onCreate || onUpdate) && (
                <TextField
                  fullWidth
                  label="Folder name"
                  value={folderName}
                  onChange={onChangeFolderName}
                  sx={{ mb: 3 }}
                />
              )}

              <Upload multiple files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
            </DialogContent>

            <DialogActions>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:cloud-upload-fill" />}
                onClick={handleUpload}
              >
                Upload
              </Button>

              {!!files.length && (
                <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
                  Remove all
                </Button>
              )}

              {(onCreate || onUpdate) && (
                <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
                  <Button variant="soft" onClick={onCreate || onUpdate}>
                    {onUpdate ? 'Save' : 'Create'}
                  </Button>
                </Stack>
              )}
            </DialogActions>
          </>
        )}
      </>
    </Dialog>
  );
}

FileManagerNewFolderDialog.propTypes = {
  folderName: PropTypes.string,
  onChangeFolderName: PropTypes.func,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
