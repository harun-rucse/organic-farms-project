import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box, TextField, MenuItem } from '@mui/material';
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from '@/sections/@dashboard/app';
import DashboardLayout from '@/layouts/dashboard';
import Loader from '@/components/Loader';
import { useGetProfileQuery } from '@/store/apiSlices/authApiSlice';
import { useGetAllStatsCountQuery, useGetAllStatsAmountQuery } from '@/store/apiSlices/statsApiSlice';
import { useGetAllBranchesQuery } from '@/store/apiSlices/branchApiSlice';

export default function DashboardAppPage() {
  const theme = useTheme();
  const [branch, setBranch] = useState('all');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [query, setQuery] = useState('branch=all');
  const [amountQuery, setAmountQuery] = useState(`branch=all&month=${new Date().getMonth() + 1}`);

  const { data: currentUser } = useGetProfileQuery();
  const { data: branches, isLoading: isBranchLoading } = useGetAllBranchesQuery();
  const { data: statsCount, isLoading } = useGetAllStatsCountQuery(query ? query : undefined);
  const { data: statsAmount, isLoading: isStatsAmountLoading } = useGetAllStatsAmountQuery(
    amountQuery ? amountQuery : undefined
  );

  const handleBranchChange = (e) => {
    const { value } = e.target;
    setBranch(value);
    setQuery(`branch=${value}&month=${month}`);
    setAmountQuery(`branch=${value}&month=${month}`);
  };

  const handleMonthChange = (e) => {
    const { value } = e.target;
    setMonth(value);
    setQuery(`branch=${branch}&month=${value}`);
    setAmountQuery(`branch=${branch}&month=${value}`);
  };

  if (isLoading || isBranchLoading || isStatsAmountLoading) {
    return <Loader isLoading={isLoading || isBranchLoading || isStatsAmountLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 5,
            [theme.breakpoints.down('sm')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 2,
            },
          }}
        >
          <Typography variant="h4">Hi {currentUser?.name}, Welcome back</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              minWidth: '30%',
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                gap: 1,
              },
            }}
          >
            <TextField
              select
              label="Select Month"
              margin="normal"
              onChange={handleMonthChange}
              value={month}
              variant="outlined"
              fullWidth
            >
              <MenuItem value={'all'}>All Month</MenuItem>
              {[
                'জানুয়ারী',
                'ফেব্রুয়ারী',
                'মার্চ',
                'এপ্রিল',
                'মে',
                'জুন',
                'জুলাই',
                'আগস্ট',
                'সেপ্টেম্বর',
                'অক্টোবর',
                'নভেম্বর',
                'ডিসেম্বর',
              ].map((month, index) => (
                <MenuItem key={index} value={index + 1}>
                  {month}
                </MenuItem>
              ))}
            </TextField>
            {currentUser?.role === 'admin' && (
              <TextField
                select
                label="Select Branch"
                margin="normal"
                onChange={handleBranchChange}
                value={branch}
                variant="outlined"
                fullWidth
              >
                <MenuItem value={'all'}>All Branches</MenuItem>
                {branches?.map((branch) => (
                  <MenuItem key={branch._id} value={branch._id}>
                    {branch.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট আয়"
              total={statsAmount?.totalRevenue}
              color="success"
              icon={'fluent-mdl2:nonprofit-logo-32'}
              format={statsAmount?.totalRevenue !== 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট খরচ"
              total={statsAmount?.totalExpense}
              color="error"
              icon={'carbon:cost-total'}
              format={statsAmount?.totalExpense !== 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="বেতন দেওয়া হয়েছে"
              total={statsAmount?.totalSalary}
              color="success"
              icon={'mdi:success-circle'}
              format={statsAmount?.totalSalary !== 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="কৃষকদের দিতে হবে"
              total={statsAmount?.totalPayable}
              color="warning"
              icon={'fluent:payment-28-filled'}
              format={statsAmount?.totalPayable !== 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="কৃষকদের দেওয়া হয়েছে"
              total={statsAmount?.totalPaid}
              color="info"
              icon={'mdi:success-circle'}
              format={statsAmount?.totalPaid !== 0}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট শাখা" total={statsCount?.nBranch} color="success" icon={'mdi:source-branch'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট গ্রাহক" total={statsCount?.nCustomer} color="info" icon={'mdi:people-group'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট কর্মচারী"
              total={statsCount?.nEmployee}
              color="success"
              icon={'clarity:employee-group-solid'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট কৃষক"
              total={statsCount?.nFarmer}
              color="error"
              icon={'noto:man-farmer-medium-dark-skin-tone'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="মোট ক্যাটেগরি" total={statsCount?.nCategory} color="info" icon={'bxs:category'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট সাব-ক্যাটেগরি"
              total={statsCount?.nSubCategory}
              color="warning"
              icon={'bxs:category'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="মোট পণ্য"
              total={statsCount?.nProduct}
              color="success"
              icon={'ri:product-hunt-fill'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="স্টকআউট পণ্য"
              total={statsCount?.nStockOutProduct}
              color="error"
              icon={'healthicons:stock-out-negative'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="নতুন অর্ডার"
              total={statsCount?.nPlacedOrder}
              color="warning"
              icon={'ic:twotone-pending-actions'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="কমপ্লিটেড অর্ডার"
              total={statsCount?.nCompletedOrder}
              color="success"
              icon={'mdi:success-circle'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="ক্যান্সেল অর্ডার"
              total={statsCount?.nCancelledOrder}
              color="error"
              icon={'material-symbols:cancel'}
            />
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
