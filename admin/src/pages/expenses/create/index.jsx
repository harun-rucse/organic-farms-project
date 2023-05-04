import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpenseCreateForm from './CreateForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useCreateExpenseMutation } from '@/store/apiSlices/expenseApiSlice';
import { useGetAllBranchesQuery } from '@/store/apiSlices/branchApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function ExpenseCreate() {
  const navigate = useNavigate();
  const notification = useNotification();
  const { data: branches, isLoading } = useGetAllBranchesQuery();
  const [createExpense, { isLoading: loading, isSuccess, isError, error }] = useCreateExpenseMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Expense created successfully', 'success');
      navigate('/dashboard/expenses');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const body = {
      category: values.category,
      amount: values.amount,
      description: values.description,
      date: values.date,
      branchOffice: values.branchOffice,
    };

    createExpense(body);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Create new expense </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create new expense
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <ExpenseCreateForm handleOnSubmit={handleSubmit} branches={branches} loading={loading} />
      </Container>
    </DashboardLayout>
  );
}

export default ExpenseCreate;
