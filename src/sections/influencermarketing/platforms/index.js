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

export default function InfluencerMarketingPlatforms() {
  const { user } = useMockedUser(); // for theme

  const [data, setData] = useState([
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/platforms/Influencity_Logo_RGB.png`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Search/Discovery, Influencer Lifecycle Management, Influencer Relationship Management, Campaign Management, Campaign Reporting, Influencer Analysis, Audience Analysis, Fake Follower/Fraud Detection, Exportable reports, Team/Collaboration Tools,",
      channels: "Instagram, YouTube, TikTok",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/platforms/modash.png`,
      link: "https://influencermarketinghub.com/monthly-influencer-marketing-report/",
      features: "Influencer Discovery, Influencer Analytics, Influencer Campaign Monitoring, Influencer Management,",
      channels: "",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/platforms/Vector.png`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Search/Discovery, Influencer Relationship Management, Team Collaboration Tools, Content Review, Content Library, Campaign Management, Campaign Reporting, Influencer Analysis, Audience Analysis, White Label Reporting, E-commerce Tools, Fake Follower/Fraud Detection, Visual Discovery,",
      channels: "Instagram, Snapchat, Facebook",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/platforms/vn-secure-logo-2.png`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: " Influencer Analysis, Moderation Tolerance Feature,",
      channels: "TikTok, Instagram, Facebook, Twitter",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/platforms/logo-3.png`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Search/Discovery, Influencer Relationship Management, Content Review, Content Library, Campaign Management, Campaign Reporting, Influencer Analysis, Audience Analysis, E-commerce Tools, Product/Gifting Tools, Fake Follower/Fraud Detection, Payment Processing, Social Listening, Competitor Research,",
      channels: "TikTok, Instagram, Facebook, Twitter",
    },
    {
      image: `${ASSETS_API}/assets/images/influencermarketing/platforms/Neo-Reach-1.png`,
      link: "https://influencermarketinghub.com/linkedin-influencer-marketing-agencies/",
      features: "Campaign Management, Search/Discovery, Influencer Relationship Management, Team Collaboration Tools, Campaign Reporting, Influencer Analysis, Audience Analysis, Forms and Compliance,",
      channels: "TikTok, Instagram, Facebook, Twitter",
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
              Influencer Marketing <br />Platforms
            </Typography>

            <Typography
              variant="body1"
              sx={{
                opacity: 0.8,
                pr: { xs: 3, xl: 5 },
                mb: { xs: 3, xl: 5 },
              }}
            >
              Discover the Ultimate Influencer Marketing Platforms to Supercharge Your Influencer Marketing Strategy.
            </Typography>

          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <img src={`${ASSETS_API}/assets/images/influencermarketing/platforms/head.svg`}></img>
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
