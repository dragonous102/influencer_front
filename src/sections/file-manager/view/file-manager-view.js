'use client';

import { useState, useCallback, useEffect, useContext } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useBoolean } from 'src/hooks/use-boolean';

import { isAfter, isBetween } from 'src/utils/format-time';

import { _allFiles, FILE_TRAIN_OPTION } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { fileFormat } from 'src/components/file-thumbnail';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import { WebsocketContext } from 'src/auth/summary/WebsocketProvider';

import { useTable, getComparator } from 'src/components/table';

import FileManagerTable from '../file-manager-table';
import FileManagerFilters from '../file-manager-filters';
// import FileManagerGridView from '../file-manager-grid-view';
import FileManagerFiltersResult from '../file-manager-filters-result';
import FileManagerNewFolderDialog from '../file-manager-new-folder-dialog';

import { useFiles, train_pdfs } from 'src/api/files';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { FileTrainingProgress } from '../file-training-progress';

import { DeleteFilesByIds } from 'src/api/invoice';
// ----------------------------------------------------------------------

const defaultFilters = {
  name: '',
  option: [],
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function FileManagerView() {
  const { enqueueSnackbar } = useSnackbar();

  const table = useTable({ defaultRowsPerPage: 10 });

  const settings = useSettingsContext();

  const [isReady, socketio, val] = useContext(WebsocketContext);

  const openDateRange = useBoolean();

  const confirm = useBoolean();
  const router = useRouter();
  const upload = useBoolean();

  const [file_count, setCount] = useState(0);
  const [file_status, setStatus] = useState([]);
  const [train_title, setTitle] = useState('OCR');
  const [train_total_count, setTotal] = useState(0);

  const [total_pages, setTotalPages] = useState(0);
  const [total_token, setTotalToken] = useState(0);
  const [isTrain, setIsTrain] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // const { files } = useFiles();

  useEffect(() => {
    useFiles().then((res) => {
      let files = res.files;
      if (files.length) {
        setTableData(files);
      }
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      if (val.type == 'ocr_started') {
        setTotal(val.total);
        setTitle(val.title);
      }

      if (val.type == 'train_started') {
        setTotal(val.total);
        setTitle(val.title);
        enqueueSnackbar('OCR finished');
        setStatus([]);
        setCount(0);
      }

      if (val.type == 'train') {
        console.log('train...');
        setTitle(val.title);

        let tempCount = file_count + 1;
        setCount(tempCount);
        let tempData = file_status;
        tempData.push({ status: val.status, filename: val.filename });
        setStatus(tempData);
      }

      if (val.type == 'ocr') {
        console.log('ocr training');
        setTitle(val.title);

        let tempCount = file_count + 1;
        setCount(tempCount);
        let tempData = file_status;
        tempData.push({ status: val.status, filename: val.filename });
        setStatus(tempData);
      }

      if (val.type == 'ocr_finished') {
        console.log('ocr_finished');
        setTitle(val.title);
        enqueueSnackbar('OCR finished');
        setStatus([]);
      }

      if (val.type == 'train_finished') {
        enqueueSnackbar('Train finished');
        setTitle(val.title);
        setStatus([]);
        // setCount(0);
        // setIsLoading(false);
      }
    }
  }, [isReady, val]);

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const dateError = isAfter(filters.startDate, filters.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset =
    !!filters.name || !!filters.option.length || (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleUploadSuccess = async (fileNames) => {
    setIsLoading(true);
    confirm.onTrue();
    let isError = '';
    await useFiles().then(async (res) => {
      let files = res.files;
      if (files.length) {
        setTableData(files);
        //confirm.onTrue();
        const { totalPage, totalPrice, totalToken, isError } = await train_pdfs(fileNames); //train pdf
        setTotalPages(totalPage);
        setTotalToken(totalToken);
        setIsTrain(true);
      }
    });

    //   router.push(paths.dashboard.invoice.root);
  };

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleTrain = async (id) => {
    const deleteRow = tableData.filter((row) => row.id == id);
    setIsLoading(true);

    const { totalPage, totalPrice, totalToken, isError } = await train_pdfs([deleteRow[0].name]); //train pdf
    setTotalPages(totalPage);
    setTotalToken(totalToken);
    setIsTrain(true);
    setTitle("Train finished");
    setIsLoading(false);
    useFiles().then((res) => {
      let files = res.files;
      if (files.length) {
        setTableData(files);
      }
    });
    if (isError) {
      enqueueSnackbar('some issues happened in traning');
    } else {
      enqueueSnackbar('success');
    }
  };

  const handleTrains = async () => {
    const deleteRows = tableData.filter((row) => table.selected.includes(row.id));
    let filesName = [];
    deleteRows.map((item) => {
      filesName.push(item.name);
    });
    //train pdfs
    setIsLoading(true);
    const { totalPage, totalPrice, totalToken, isError } = await train_pdfs(filesName); //train pdf

    setTotalPages(totalPage);
    setTotalToken(totalToken);
    setIsTrain(true);
    setTitle("Train finished");

    useFiles().then((res) => {
      let files = res.files;
      if (files.length) {
        setTableData(files);
      }
    });

    if (isError) {
      enqueueSnackbar('some issues happened in traning');
    } else {
      enqueueSnackbar('success');
    }
  };

  const renderFilters = (
    <Stack
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
    >
      <FileManagerFilters
        openDateRange={openDateRange.value}
        onCloseDateRange={openDateRange.onFalse}
        onOpenDateRange={openDateRange.onTrue}
        //
        filters={filters}
        onFilters={handleFilters}
        //
        dateError={dateError}
        typeOptions={FILE_TRAIN_OPTION}
      />
    </Stack>
  );

  const renderResults = (
    <FileManagerFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  const handleDelete = async () => {
    console.log('Delete all accounts');
    const deleteRows = tableData.filter((row) => table.selected.includes(row.id));
    let ids = [];
    await deleteRows.map((item) => {
      ids.push(item.id);
    });

    let resultData = await DeleteFilesByIds(ids);
    if (resultData.isError) {
      enqueueSnackbar('Failed to delete');
    } else {
      enqueueSnackbar('success');
    }
    console.log(deleteRows);

    await useFiles().then(async (res) => {
      let files = res.files;
      if (files.length) {
        setTableData(files);
      }
    });
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">File Manager</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={upload.onTrue}
          >
            Upload
          </Button>
        </Stack>

        <Stack
          spacing={2.5}
          sx={{
            my: { xs: 3, md: 5 },
          }}
        >
          {renderFilters}

          {canReset && renderResults}
        </Stack>

        {notFound ? (
          <EmptyContent
            filled
            title="No Data"
            sx={{
              py: 10,
            }}
          />
        ) : (
          <>
            <FileManagerTable
              table={table}
              dataFiltered={dataFiltered}
              onDeleteRow={handleTrain}
              notFound={notFound}
              onOpenConfirm={confirm.onTrue}
              handleDelete={handleDelete}
              isLoading={isLoading}
            />
          </>
        )}
      </Container>

      <FileManagerNewFolderDialog
        open={upload.value}
        onClose={upload.onFalse}
        handleUploadSuccess={handleUploadSuccess}
      />

      <ConfirmDialog
        open={confirm.value}
        onClose={() => {
          confirm.onFalse();
          router.push(paths.dashboard.invoice.root);
        }}
        title={train_title + '...' + file_count + '/' + train_total_count}
        content={
          isLoading ? (
            <Stack
              sx={{
                display: 'flex',
                margin: 'auto',
                alignItems: 'center',
                width: '500px',
                py: 3,
              }}
            >
              <FileTrainingProgress
                count={file_count}
                title={train_title}
                total={train_total_count}
                status={file_status}
                totalPages={total_pages}
                totalTokens={total_token}
                isTrain={isTrain}
              />
            </Stack>
          ) : (
            <>
              Are you sure want to train <strong> {table.selected.length} </strong> items?
            </>
          )
        }
        action={
          <Button
            variant="contained"
            color="error"
            disabled={isLoading}
            onClick={() => {
              handleTrains();
              // confirm.onFalse();
            }}
          >
            Train
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, option, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (file) => file.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (option.length) {
    inputData = inputData.filter((file) => option.includes(fileFormat(file.option)));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((file) => isBetween(file.createdAt, startDate, endDate));
    }
  }

  return inputData;
}
