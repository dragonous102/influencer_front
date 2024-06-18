'use client';

import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _invoices } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { GetPatientHistoryById } from 'src/api/invoice';

import InvoiceDetails from '../invoice-details';
import { useEffect, useState } from 'react';

import _ from 'lodash';

// ----------------------------------------------------------------------

export default function InvoiceDetailsView({ id, item }) {
  const settings = useSettingsContext();
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    setInvoice(item)
    // GetPatientHistoryById(id).then((res) => {
    //   setInvoice(res.patient);
    // });
  }, []);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={invoice?.patient_name}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Summary',
            href: paths.dashboard.invoice.root,
          },
          { name: invoice?.patient_name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      {_.isEmpty(invoice) ? <></> : <InvoiceDetails invoice={invoice} />}
    </Container>
  );
}

InvoiceDetailsView.propTypes = {
  id: PropTypes.string,
};
