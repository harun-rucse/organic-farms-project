import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetTransactionQuery, useUpdateTransactionMutation } from '@/store/apiSlices/transactionApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function TransactionUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: transaction, isLoading: isTransactionLoading } = useGetTransactionQuery(id);
  const [updateTransaction, { isLoading: loading, isSuccess, isError, error }] = useUpdateTransactionMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Transaction updated successfully', 'success');
      navigate('/dashboard/transactions');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const body = {
      trxId: values.trxId,
      paymentStatus: values.paymentStatus,
    };

    updateTransaction({ id, body });
  };

  if (isTransactionLoading) {
    return <Loader isLoading={isTransactionLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update transaction </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update transaction
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {transaction && (
          <TransactionEditForm handleOnSubmit={handleSubmit} transaction={transaction} loading={loading} />
        )}
      </Container>
    </DashboardLayout>
  );
}

export default TransactionUpdate;
