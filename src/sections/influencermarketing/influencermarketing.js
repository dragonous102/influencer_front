'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useMockedUser } from 'src/hooks/use-mocked-user'; //for theme

// import { useAuthContext } from 'src/auth/hooks';

import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import AppFeatured from '../overview/app/app-featured';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Box, CardContent, Link } from '@mui/material';
// ----------------------------------------------------------------------
import { ASSETS_API } from 'src/config-global';
import { useState } from 'react';

export default function InfluencerMarketing() {
  const { user } = useMockedUser(); // for theme

  const [data, setData] = useState([
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/image-3-1.png`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "6 Leading LinkedIn Influencer Marketing Agencies [+ Tips for...",
      content: "Very few brands use LinkedIn for influencer marketing. According to our The State of...",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/benchmark.webp`,
      link: "https://influencermarketinghub.com/monthly-influencer-marketing-report/",
      title: "May 2024 Influencer Marketing Report",
      content: "The Influencer Marketing Report May 2024 provides an in-depth look at the current state...",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/image.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "11 Brilliant Examples of Brands that Work with Micro-Influencers",
      content: "With the rise of micro-influencer marketing, brands are increasingly turning to smaller...",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/image-5.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "How to Effectively Leverage User-Generated Content (UGC) for B2B",
      content: "The social media landscape is no longer just a playground for consumer marketers. It's...",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/image-1-3.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "16 Brand Positioning Statement Examples Tailored for Success",
      content: "Have you ever wondered how classic brands like Coca-Cola and Walt Disney remained...",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/image-3.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "The Insider’s Handbook: A Complete Guide for Brands to Twitch...",
      content: "Brands and game publishers attracted to Twitch’s expansive user base—240 million...",
    },
  ]);
  // const { user } = useAuthContext();
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
              Influencer Marketing <br />News and Resources
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                mb: { xs: 3, xl: 5 },
              }}
            >
              Influencer Marketing Hub offers you all the latest Influencer Marketing news, tools and resources to enable influencers, agencies and platforms to connect and harness the power of Marketing under the Influence.
            </Typography>

          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        {
          data?.length > 0 && data.map((item, index) => (
            <Grid xs={12} md={6} lg={4} key={index} display={"flex"} justifyContent={"center"}>
              <Card sx={{ width: "90%", height: "420px" }}>
                <img src={item.image}></img>
                <Link href={item.link}>
                  <CardHeader
                    title={item.title}
                    subheader={""}
                    sx={{ textAlign: "center" }}
                  />
                </Link>
                <CardContent sx={{ py: 1, textAlign: "center" }}>{item.content}</CardContent>
                <Box display={"flex"} padding={2} justifyContent={"center"}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    marginLeft: "calc(50% - 60px)"
                  }}>
                  <img
                    src={`${ASSETS_API}/assets/images/influencermarketing/under_article.svg`}
                    style={{ height: 23, textAlign: "center", opacity: 0.5 }}
                  >
                  </img>
                </Box>
              </Card>
            </Grid>
          ))
        }



      </Grid>
    </Container>
  );
}
