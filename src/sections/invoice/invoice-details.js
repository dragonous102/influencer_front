import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import { extract } from 'sentence-extractor';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { INVOICE_STATUS_OPTIONS } from 'src/_mock';

import Label from 'src/components/label';

import InvoiceToolbar from './invoice-toolbar';

// ----------------------------------------------------------------------

export default function InvoiceDetails({ invoice }) {
  const [currentStatus, setCurrentStatus] = useState('all');
  const handleChangeStatus = useCallback((event) => {
    setCurrentStatus(event.target.value);
  }, []);
  const isObject = (val) => typeof val === 'object' && val !== null;

  const renderJson = (value) => {
    const isArray = Array.isArray(value);
    if (isArray) {
      return (
        <Stack>
          {value.map((item, index) => (
            <Typography variant="body2" sx={{ mb: 1, px: 2, py: 1 }} key={index}>
              {isObject(item) ? renderJson(item) : item.toString()}
            </Typography>
          ))}
        </Stack>
      );
    } else if (isObject(value)) {
      return (
        <>
          {Object.keys(value).map((key, index) => (
            <Stack key={index}>
              <Typography variant="subtitle2">{key}:</Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, px: 2, py: 1 }}
                style={{ lineHeight: '30px' }}
              >
                {renderJson(value[key])}
              </Typography>
            </Stack>
          ))}
        </>
      );
    } else {
      return value.toString();
    }
  };
  const renderFooter = (summary) => (
    <Grid container>
      <Grid xs={12} md={9} sx={{ py: 3 }} mb={3}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Summary:
        </Typography>
        {renderJson(summary)}
        <Typography variant="body2"></Typography>
      </Grid>
    </Grid>
  );
  return (
    <>
      <InvoiceToolbar
        invoice={invoice}
        currentStatus={currentStatus || ''}
        onChangeStatus={handleChangeStatus}
        statusOptions={INVOICE_STATUS_OPTIONS}
      />

      <Card sx={{ pt: 5, px: 5 }}>
        <Box
          rowGap={5}
          display="grid"
          alignItems="center"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          }}
        >
          <Box
            component="img"
            alt="logo"
            src="/logo/logo_single.svg"
            sx={{ width: 48, height: 48 }}
          />

          <Stack spacing={1} alignItems={{ xs: 'flex-start', md: 'flex-end' }}>
            <Label
              variant="soft"
              color={
                (currentStatus === 'paid' && 'success') ||
                (currentStatus === 'pending' && 'warning') ||
                (currentStatus === 'overdue' && 'error') ||
                'default'
              }
            >
              {currentStatus}
            </Label>

            <Typography variant="h6">{invoice.patient_name}</Typography>
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Patient
            </Typography>

            {invoice.patient_name}
            <br />
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Signer
            </Typography>
            {invoice.doctor_name}
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Visit Date
            </Typography>
            {invoice.visit_date == 'Unknown' ? 'Unknown' : fDate(invoice.visit_date)}
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Sign Date
            </Typography>
            {invoice.signed_date == 'Unknown' ? 'Unknown' : fDate(invoice.signed_date)}
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Activity
            </Typography>

            {invoice.activity_summarized}
          </Stack>

          <Stack sx={{ typography: 'body2' }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Facility And Provider
            </Typography>
            {invoice.facility + '/' + invoice.signer}
          </Stack>
        </Box>

        <Divider sx={{ mt: 5, borderStyle: 'dashed' }} />

        {renderFooter(invoice.summary)}
      </Card>
    </>
  );
}

InvoiceDetails.propTypes = {
  invoice: PropTypes.object,
};
