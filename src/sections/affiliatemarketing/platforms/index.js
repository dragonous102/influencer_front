'use client';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useMockedUser } from 'src/hooks/use-mocked-user'; //for theme

// import { useAuthContext } from 'src/auth/hooks';

import { useSettingsContext } from 'src/components/settings';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Box, CardContent, Link } from '@mui/material';
// ----------------------------------------------------------------------
import { ASSETS_API } from 'src/config-global';
import { useState } from 'react';

export default function AffiliateMarketingPlatforms() {
  const { user } = useMockedUser(); // for theme

  const [data, setData] = useState([
    {
      image: `${ASSETS_API}/assets/images/socialmedia/platforms/sprout.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Analytics, Automated Publishing, Contact Management, Content Management, Conversion Tracking, Customer Targeting, Keyword Filtering, Multi-Account Management, Post Scheduling, Brand Tracking, Reporting/Analytics, Social Media Monitoring,",
      channels: "Facebook, TikTok, Twitter, Instagram, Threads, LinkedIn, Pinterest",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/platforms/Brand24-Logo-1.webp`,
      link: "https://influencermarketinghub.com/monthly-influencer-marketing-report/",
      features: "Analytics, Hashtag Tracking, Sentiment Analysis, Reputation Management, Competitive Analysis, Analytics/Reporting, Social Media Mentions Volume & Reach, AI Insights, Influencer Analysis, Emoji Analysis, Storm Alerts,",
      channels: "Facebook, Instagram, TikTok, Twitter, Youtube, LinkedIn, Podcasts, Newsletter",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/platforms/sendible.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Analytics, Automated Publishing, Content Management, Keyword Filtering, Multi-Account Management, Post Scheduling,",
      channels: "Facebook, TikTok, Twitter, Instagram, LinkedIn, Google My Business, YouTube, Blogs",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/platforms/image-1-3.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Analytics, Social Media Management, Marketing Calendar,",
      channels: "Facebook, Instagram, X, LinkedIn, YouTube, TikTok, Pinterest",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/platforms/image-66.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Analytics, Automated Publishing, Content Management, Keyword Filtering, Multi-Account Management, Post Scheduling, Social Media Monitoring, Hashtag Tracking, Sentiment Analysis, Reputation Management, Social Media Management,",
      channels: "Facebook, Instagram, Twitter, LinkedIn, WhatsApp, YouTube.",
    },
    {
      image: `${ASSETS_API}/assets/images/socialmedia/platforms/Loomly-Logo-copy.webp`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Analytics, Automated Publishing, Contact Management, Customer Targeting, Keyword Filtering, Multi-Account Management, Post Scheduling, Customer Engagement, Multi-User Collaboration, Reporting/Analytics,",
      channels: "Facebook, Instagram, LinkedIn, Twitter, Pinterest, Google My Business",
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
            justifychannels="center"
            alignItems={{ xs: 'center', md: 'flex-start' }}

          >
            <Typography variant="h2" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
              Social Media <br /> Marketing Platforms
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                pr: { xs: 3, xl: 5 },
                mb: { xs: 3, xl: 5 },
              }}
            >
              Streamline Your Social Media Campaigns with Innovative Social Media Marketing Tools and Platforms.
            </Typography>

          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <img src={`${ASSETS_API}/assets/images/socialmedia/platforms/smm_platforms2.svg`}></img>
        </Grid>

        {
          data?.length > 0 && data.map((item, index) => (
            <Grid xs={12} md={12} xl={12} key={index}  >
              <Card sx={{ width: "100%", height: "150px", alignContent: "center" }} >
                <Grid container>
                  <Grid xs={12} md={3} xl={3} alignContent={"center"}>
                    <Box padding={1} margin={1} border={0.5} borderRadius={1}
                      sx={{ height: "120px", alignContent: "center" }}
                    >
                      <img src={item.image}  ></img>

                    </Box>

                  </Grid>
                  <Grid xs={12} md={8} xl={8} alignContent={"center"}>
                    <CardContent sx={{ py: 1, textAlign: "left", fontSize: 14 }}><span style={{ fontWeight: "bold" }}>Key Features: </span>{item.features}</CardContent>
                    <CardContent sx={{ py: 1, textAlign: "left", fontSize: 14 }}><span style={{ fontWeight: "bold" }}>Channels: </span>{item.channels}</CardContent>
                  </Grid>
                  <Grid xs={12} md={1} xl={1} alignContent={"center"}>
                    <Box padding={1}
                      sx={{ height: "100px", alignContent: "center" }}
                    >
                      <Button
                        variant="soft"
                        color="primary"
                        size="large"
                      >
                        View
                      </Button>
                    </Box>

                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        }



      </Grid>
    </Container>
  );
}
