import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetCustomerQuery, useUpdateCustomerMutation } from '@/store/apiSlices/customerApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function ReviewUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: customer, isLoading: isReviewLoading } = useGetCustomerQuery(id);
  const [updateCustomer, { isLoading: loading, isSuccess, isError, error }] = useUpdateCustomerMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Customer updated successfully', 'success');
      navigate('/dashboard/customers');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const body = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      verified: values.verified,
    };

    updateCustomer({ id, body });
  };

  if (isReviewLoading) {
    return <Loader isLoading={isReviewLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update customer </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update customer
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {customer && <CustomerEditForm handleOnSubmit={handleSubmit} customer={customer} loading={loading} />}
      </Container>
    </DashboardLayout>
  );
}

export default ReviewUpdate;
