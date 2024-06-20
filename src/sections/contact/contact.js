'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

import { useMockedUser } from 'src/hooks/use-mocked-user'; //for theme

// import { useAuthContext } from 'src/auth/hooks';

import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import { Box, CardContent, Link, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// ----------------------------------------------------------------------
import { ASSETS_API } from 'src/config-global';
import { useState } from 'react';
export default function Contact() {
  const { user } = useMockedUser(); // for theme


  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} >
      <Grid container spacing={3} sx={{
        px: "10%"
      }}>
        <Grid xs={12} md={8}>
          <Stack
            flexGrow={1}
            justifyContent="center"
            alignItems={{ xs: 'center', md: 'flex-start' }}

          >
            <Typography variant="h2" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
              Contact Us
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                mb: { xs: 3, xl: 5 },
              }}
            >
              Whatever your question, we’re here to help.<br /><br />
              Whether you're an Influencer, an Agency or an Influencer Marketing Platform wishing to work with us or contribute to our Case Studies and educational pieces, please get in touch.
            </Typography>

          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <img src={`${ASSETS_API}/assets/images/contact/head_img.svg`}></img>
        </Grid>

        <Grid xs={12} md={12} spacing={3}>
          <Typography variant="body2" textAlign={"center"}>Please use the form below to get in touch. You’ll hear back from us within one business day.</Typography>
          <Stack spacing={2.5} mt={3}>
            <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} spacing={2}>
              <TextField fullWidth name="name" label="Your Name" />
              <TextField fullWidth name="email" label="Your Email" />
            </Stack>

            <TextField name="subject" label="Subject" />
            <TextField name="message" label="Your Message" />

            <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }} spacing={2}>

              <LoadingButton
                color="primary"
                size="large"
                type="button"
                variant="contained"
                loading={false}
              >
                Send
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>

      </Grid>
    </Container>
  );
}
