'use client';

// import sumBy from 'lodash/sumBy';
import { useState, useCallback, useEffect } from 'react';

// import Tab from '@mui/material/Tab';
// import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { isAfter, isBetween } from 'src/utils/format-time';

import { _invoices } from 'src/_mock';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

// import InvoiceAnalytic from '../invoice-analytic';
import InvoiceTableRow from '../invoice-table-row';

import _ from 'lodash';

// ----------------------------------------------------------------------

import { GetPatientHistoryData, GetPatientsList, DeleteSummaryByIds } from 'src/api/invoice';
import InvoiceDetailsView from './invoice-details-view';
import PDFViewerForPage from 'src/components/PDFviewer/PDFViewer';

import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
// ----------------------------------------------------------------------

import { HOST_API } from 'src/config-global';
import InvoicePDF from '../invoice-pdf';
import Loading from 'src/app/loading';

const TABLE_HEAD = [
  { id: 'facility', label: 'Facility' },
  { id: 'provider', label: 'Provider' },
  { id: 'activity', label: 'Title' },
  { id: 'visit_date', label: 'Date' },
  { id: 'page_number', label: 'Page' },
  { id: 'summary', label: 'Summary' },
  { id: 'id' },
];

const defaultFilters = {
  patient_name: '',
  patient_list: [],
  status: 'all',
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function InvoiceListView() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const loading = useBoolean(false);
  const router = useRouter();

  const settings = useSettingsContext();

  const table = useTable({ defaultOrderBy: 'createDate' });

  const view = useBoolean();

  const pdfView = useBoolean();

  const exportPDFView = useBoolean();

  const [patientsList, setpatiensList] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectPatient, setSelectPatient] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [file_name, setFileName] = useState('');

  const [id, setSelectId] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const [filters, setFilters] = useState(defaultFilters);

  const dateError = isAfter(filters.startDate, filters.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const denseHeight = table.dense ? 56 : 56 + 20;

  const canReset =
    !!filters.name ||
    !!filters.patient_list.length ||
    filters.status !== 'all' ||
    (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;
  const handleViewRow = (item) => {
    setSelectId(item.id);
    setSelectedItem(item)
    view.onTrue();
  };

  const handleDocumentView = (file_name) => {
    setFileName(file_name);
    setPageNumber(0);
    pdfView.onTrue();
  };

  const handleDocumentViewByDate = (file_name, pageNumber) => {
    setFileName(file_name);
    setPageNumber(pageNumber);
    pdfView.onTrue();
  };

  const exportPDF = () => { };
  useEffect(() => {
    GetPatientsList().then((res) => {
      setpatiensList(res.patients);
      setSelectPatient(res.patients[0]);
    });

    GetPatientHistoryData().then((res) => {
      setTableData(res.patients);
    });
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Summary"
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: 'Summary',
              href: paths.dashboard.invoice.root,
            },
            {
              name: selectPatient,
            },
          ]}
          action={
            <>
              <Button
                component={RouterLink}
                href={paths.dashboard.fileManager}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                sx={{ mr: '20px' }}
              >
                New PDF
              </Button>
              <Button
                onClick={() => {
                  exportPDFView.onTrue();
                }}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Export PDF
              </Button>
            </>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Card>
          <TableContainer sx={{ position: 'relative', maxHeight: '600px' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) => {
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                );
              }}
              action={
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="primary"
                      onClick={async () => {
                        console.log('Delete all accounts');
                        const deleteRows = tableData.filter((row) =>
                          table.selected.includes(row.id)
                        );
                        let ids = [];
                        deleteRows.map((item) => {
                          ids.push(item.id);
                        });

                        let resultData = await DeleteSummaryByIds(ids);
                        if (resultData.isError) {
                          enqueueSnackbar('Failed to delete');
                        } else {
                          enqueueSnackbar('success');
                        }
                        GetPatientHistoryData().then((res) => {
                          setTableData(res.patients);
                        });
                        console.log(deleteRows);
                      }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Table
              size={table.dense ? 'small' : 'medium'}
              // sx={{ minWidth: 800 }}
              stickyHeader
              aria-label="sticky table"
            >
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <InvoiceTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row)}
                      onDocumentView={() => handleDocumentView(row.file_name)}
                      onDocumentViewByDate={() =>
                        handleDocumentViewByDate(
                          row.file_name,
                          row.page_number.toString().split('-')[0]
                        )
                      }
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Back
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1 }}>
            <InvoiceDetailsView id={id} item={selectedItem}></InvoiceDetailsView>
          </Box>
        </Box>
      </Dialog>

      <Dialog fullScreen open={pdfView.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="inherit" variant="contained" onClick={pdfView.onFalse}>
              Back
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewerForPage
              fileUrl={HOST_API + '/assets/' + file_name}
              pageNumber={pageNumber}
            ></PDFViewerForPage>
          </Box>
        </Box>
      </Dialog>
      <Dialog fullScreen open={exportPDFView.value}>

        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="inherit" variant="contained" onClick={exportPDFView.onFalse}>
              Back
            </Button>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <InvoicePDF patient_summary_data={tableData} patient_name={selectPatient}></InvoicePDF>
            </PDFViewer>
          </Box>

        </Box>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, status, patient_list, startDate, endDate } = filters;

  const stabilizedThis = inputData?.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (invoice) =>
        invoice.patient_name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        invoice.patient_name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((invoice) => invoice.status === status);
  }

  if (patient_list.length) {
    inputData = inputData.filter((invoice) => patient_list.includes(invoice.patient_name));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((invoice) => isBetween(invoice.createDate, startDate, endDate));
    }
  }

  return inputData;
}
