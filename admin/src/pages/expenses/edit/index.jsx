import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetExpenseQuery, useUpdateExpenseMutation } from '@/store/apiSlices/expenseApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function ExpenseUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: expense, isLoading: isExpenseLoading } = useGetExpenseQuery(id);
  const [updateExpense, { isLoading: loading, isSuccess, isError, error }] = useUpdateExpenseMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Expense updated successfully', 'success');
      navigate('/dashboard/expenses');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const body = {
      category: values.category,
      amount: values.amount,
      description: values.description,
      date: values.date,
    };

    updateExpense({ id, body });
  };

  if (isExpenseLoading) {
    return <Loader isLoading={isExpenseLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update expense </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update expense
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {expense && <ExpenseEditForm handleOnSubmit={handleSubmit} expense={expense} loading={loading} />}
      </Container>
    </DashboardLayout>
  );
}

export default ExpenseUpdate;
