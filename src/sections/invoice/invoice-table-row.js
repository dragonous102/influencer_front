import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import Stack from '@mui/material/Stack';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import ShowMore from 'src/components/show-more';

import { HOST_API } from 'src/config-global';
import { useTheme } from '@mui/material';
import { IconSearch } from 'src/utils/icons';
// ----------------------------------------------------------------------

export default function InvoiceTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onDocumentView,
  onDocumentViewByDate,
}) {
  const theme = useTheme();
  const {
    patient_name,
    doctor_name,
    facility,
    activity,
    visit_date,
    file_name,
    signer,
    id,
    summary,
    activity_summarized,
    page_number,
  } = row;

  const popover = usePopover();
  const isObject = (val) => typeof val === 'object' && val !== null;
  const renderJson = (value) => {
    const isArray = Array.isArray(value);
    if (isArray) {
      return value.map((item, index) => (isObject(item) ? renderJson(item) : item.toString()));
    } else if (isObject(value)) {
      return Object.keys(value).map((key, index) => renderJson(value[key]));
    } else {
      // Non-object like strings, numbers, etc.
      return value?.toString();
    }
  };
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell>{facility ? facility : 'Unknown'}</TableCell>
        <TableCell>{doctor_name ? doctor_name + '/' + signer : signer}</TableCell>
        <TableCell>{activity_summarized}</TableCell>
        <TableCell style={{ width: '150px' }}>
          {visit_date == 'Unknown' ? 'Unknown' : fDate(visit_date, 'MM-dd-yyyy')}
        </TableCell>
        <TableCell
          style={{
            width: '100px',
            cursor: 'pointer',
            color: theme.palette.mode == 'dark' ? 'red' : 'blue',
            userSelect: 'none',
          }}
          onClick={() => {
            onDocumentViewByDate();
          }}
        >
          {page_number}
        </TableCell>

        <TableCell style={{ width: '40%' }}>
          <ShowMore onViewRow={onViewRow}>{renderJson(summary)}</ShowMore>
        </TableCell>

        <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View Summary
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDocumentView();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View Document
        </MenuItem>
      </CustomPopover>
    </>
  );
}

InvoiceTableRow.propTypes = {
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
