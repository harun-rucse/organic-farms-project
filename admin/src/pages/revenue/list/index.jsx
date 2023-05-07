import { Helmet } from 'react-helmet-async';
import { Container, Stack, Alert } from '@mui/material';
import Result from './Result';
import Loader from '@/components/Loader';
import { useGetAllRevenuesQuery } from '@/store/apiSlices/revenueApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export default function List() {
  const { data = [], isLoading, isError, error } = useGetAllRevenuesQuery();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Revenues </title>
      </Helmet>

      <Container>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <Result data={data} />
      </Container>
    </DashboardLayout>
  );
}
