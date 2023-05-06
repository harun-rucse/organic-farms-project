import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Alert } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import Loader from '@/components/Loader';
import { useGetAllOrdersQuery } from '@/store/apiSlices/orderApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export default function List() {
  const navigate = useNavigate();
  const { data = [], isLoading, isError, error } = useGetAllOrdersQuery();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Orders </title>
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
