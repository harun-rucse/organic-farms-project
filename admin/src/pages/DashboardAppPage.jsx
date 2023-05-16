import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from '@/sections/@dashboard/app';
import DashboardLayout from '@/layouts/dashboard';
import { useGetProfileQuery } from '@/store/apiSlices/authApiSlice';

export default function DashboardAppPage() {
  const theme = useTheme();
  const { data: currentUser } = useGetProfileQuery();

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi {currentUser?.name}, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট আয়"
              total={100000}
              color="success"
              icon={'fluent-mdl2:nonprofit-logo-32'}
              format
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট খরচ" total={52020} color="error" icon={'carbon:cost-total'} format />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="বেতন দেওয়া হয়েছে"
              total={4000}
              color="success"
              icon={'mdi:success-circle'}
              format
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="কৃষকদের দিতে হবে"
              total={4000}
              color="warning"
              icon={'fluent:payment-28-filled'}
              format
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট কৃষকদের দেওয়া হয়েছে"
              total={4000}
              color="info"
              icon={'mdi:success-circle'}
              format
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট শাখা" total={10} color="success" icon={'mdi:source-branch'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট গ্রাহক" total={20} color="info" icon={'mdi:people-group'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট কর্মচারী" total={5} color="success" icon={'clarity:employee-group-solid'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট কৃষক"
              total={234}
              color="error"
              icon={'noto:man-farmer-medium-dark-skin-tone'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট ক্যাটেগরি" total={234} color="info" icon={'bxs:category'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট সাব-ক্যাটেগরি" total={234} color="warning" icon={'bxs:category'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট পণ্য" total={234} color="success" icon={'ri:product-hunt-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="স্টকআউট পণ্য" total={234} color="error" icon={'healthicons:stock-out-negative'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="পেন্ডিং অর্ডার" total={234} color="warning" icon={'ic:twotone-pending-actions'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="কমপ্লিটেড অর্ডার" total={234} color="success" icon={'mdi:success-circle'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="ক্যান্সেল অর্ডার" total={234} color="error" icon={'material-symbols:cancel'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
}
