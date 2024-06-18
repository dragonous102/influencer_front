'use client';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

import PromptDetail from '../invoice-prompt';
// ----------------------------------------------------------------------

export default function Prompt() {
  const settings = useSettingsContext();
  useEffect(() => {}, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Prompt"
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
            name: 'Prompt',
          },
        ]}
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
        <PromptDetail></PromptDetail>
      </Box>
    </Container>
  );
}
