import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import OrderEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetOrderQuery, useUpdateOrderMutation } from '@/store/apiSlices/orderApiSlice';
import { useGetAllEmployeesQuery } from '@/store/apiSlices/employeeApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function OrderUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();
  const [query, setQuery] = useState('');

  const { data: deleverdPersons, isLoading: isEmployeeLoading } = useGetAllEmployeesQuery(query ? query : undefined);
  const { data: order, isLoading: isOrderLoading, isSuccess: isOrderFetchSuccess } = useGetOrderQuery(id);
  const [updateOrder, { isLoading: loading, isSuccess, isError: isOrderError, error: orderError }] =
    useUpdateOrderMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Order updated successfully', 'success');
      navigate('/dashboard/orders');
    }
  }, [isSuccess, navigate, notification]);

  useEffect(() => {
    if (isOrderFetchSuccess) {
      setQuery(`branch=${order?.branchOffice?._id}&role=delivery-person`);
    }
  }, [isOrderFetchSuccess, order]);

  const handleSubmit = (values) => {
    if (!values) return;

    updateOrder({ id, body: values });
  };

  if (isOrderLoading || isEmployeeLoading) {
    return <Loader isLoading={isOrderLoading || isEmployeeLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update order </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update order
          </Typography>
        </Stack>
        {isOrderError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{orderError?.data?.message}</Alert>
          </Stack>
        )}
        {order && (
          <OrderEditForm
            handleOnSubmit={handleSubmit}
            order={order}
            deleverdPersons={deleverdPersons}
            loading={loading}
          />
        )}
      </Container>
    </DashboardLayout>
  );
}

export default OrderUpdate;
