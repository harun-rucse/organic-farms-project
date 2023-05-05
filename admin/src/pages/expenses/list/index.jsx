import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Alert } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import Loader from '@/components/Loader';
import { useGetAllExpensesQuery } from '@/store/apiSlices/expenseApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export default function List() {
  const navigate = useNavigate();
  const { data = [], isLoading, isError, error } = useGetAllExpensesQuery();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Expenses </title>
      </Helmet>

      <Container>
        <PageToolbar
          title="Expenses"
          buttonLabel="Add new expenses"
          handleOnClick={() => navigate('/dashboard/expense/create')}
        />
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
