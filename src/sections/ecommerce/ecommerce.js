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

export default function Ecommerce() {
  const { user } = useMockedUser(); // for theme

  const [data, setData] = useState([
    {
      image: `${ASSETS_API}/assets/images/socialmedia/Best-Marketing-Campaigns-Facebook.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "13 Best Marketing Campaigns on Facebook",
      content: "When you’re marketing on a platform like Facebook, where there’s an abundance of...",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/Viral-Social-Media-Marketing-Campaign-Examples.webp`,
      link: "https://influencermarketinghub.com/monthly-influencer-marketing-report/",
      title: "6 Examples of Viral Social Media Campaigns and What Makes Them...",
      content: "Here’s an open secret: virality isn’t guaranteed. It may not happen, even if you’ve...",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/Case-Studies-of-Successful-Campaigns-on-Social-Media-Platforms.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "Valuable Insights from Social Media Platform Case Studies Based...",
      content: "For brands, it can be a struggle to understand how each social media platform works and...",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/image-1-1.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "12 Social Media Marketing Agency Tips",
      content: "Starting a social media marketing agency may be challenging, but keeping it is a whole...",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/image-1.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "11 Best Marketing Campaigns on TikTok",
      content: "With its highly visual and engaging nature, TikTok offers marketers the opportunity to...",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/Social-Media-Marketing-Agency-Campaigns.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      title: "6 Social Media Agency Campaigns to Take Inspiration From in 2024",
      content: "It’s no secret that social media platforms have become a powerful marketing tool for...",
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
              Social Media Marketing <br />News and Resources
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                mb: { xs: 3, xl: 5 },
              }}
            >
              Influencer Marketing Hub offers you all the latest Social Media news, tools and resources to enable influencers, agencies and platforms to connect and harness the power of digital marketing.
            </Typography>

          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <img src={`${ASSETS_API}/assets/images/socialmedia/mediakit.svg`}></img>
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
