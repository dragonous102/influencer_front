'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useSettingsContext } from 'src/components/settings';
import { useState, useEffect } from 'react';
import CustomizedTimeline from '../invoice-timeline';
import { GetPatientHistoryData, UpdatePatientHistoryData } from 'src/api/invoice';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function Timeline() {
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const editMode = useBoolean(false);
  const undoMode = useBoolean(false);
  const redoMode = useBoolean(false);


  const saveIcon = () => {
    editMode.onFalse()
    undoMode.onFalse()

    UpdatePatientHistoryData(tableData).then(res => {
      enqueueSnackbar('Saved successfully!');
    })
  }

  useEffect(() => {
    GetPatientHistoryData().then((res) => {
      setTableData(res.patients);
    });
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="TimeLine"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Results',
            href: paths.dashboard.invoice.root,
          },
          {
            name: 'TimeLine',
          },
        ]}
        action={
          <>
            {
              undoMode.value && <Button
                onClick={() => {
                  const temp = [...tableData]
                  setTableData(oldData)
                  setOldData(temp)
                  redoMode.onTrue()
                }}
                disabled={redoMode.value}
                variant="contained"
                sx={{ marginRight: "1rem" }}
                startIcon={
                  <Iconify icon="mingcute:back-line" />
                }
              >
                Undo
              </Button>
            }

            {
              undoMode.value && <Button
                onClick={() => {
                  const temp = [...tableData]
                  setTableData(oldData)
                  setOldData(temp)
                  redoMode.onFalse()
                }}
                disabled={!redoMode.value}
                variant="contained"
                sx={{ marginRight: "1rem" }}
                startIcon={
                  <Iconify icon="mingcute:forward-line" />
                }
              >
                Redo
              </Button>
            }

            {
              editMode.value ?
                <Button
                  onClick={() => saveIcon()}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:save-line" />}
                >
                  Save
                </Button> :
                <Button
                  onClick={() => {
                    editMode.onTrue()
                  }}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:edit-line" />}
                >
                  Edit Icon
                </Button>
            }

          </>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Box
        sx={{
          mt: 5,
          width: 1,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <CustomizedTimeline data={tableData} setTableData={setTableData} editMode={editMode.value} setOldData={setOldData} undoMode={undoMode}></CustomizedTimeline>
      </Box>
    </Container>
  );
}
