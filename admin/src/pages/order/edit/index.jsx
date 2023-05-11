import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import OrderEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetOrderQuery, useUpdateOrderMutation } from '@/store/apiSlices/orderApiSlice';
import { useGetAllEmployeesQuery } from '@/store/apiSlices/employeeApiSlice';
import { useSendOtpMutation } from '@/store/apiSlices/authApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import OTPModal from '@/components/OTPModal';

function OrderUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();
  const [query, setQuery] = useState('');
  const [values, setValues] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});
  const [hash, setHash] = useState('');

  const [sendOtp, { isLoading: isOtpLoading, isSuccess: isOtpSuccess, data: otpData, isError, error: otpError }] =
    useSendOtpMutation();
  const { data: deleverdPersons, isLoading: isEmployeeLoading } = useGetAllEmployeesQuery(query ? query : undefined);
  const { data: order, isLoading: isOrderLoading, isSuccess: isOrderFetchSuccess } = useGetOrderQuery(id);
  const [updateOrder, { isLoading: loading, isSuccess, isError: isOrderError, error: orderError }] =
    useUpdateOrderMutation();

  useEffect(() => {
    if (isOtpSuccess) {
      setHash(otpData?.hash);
      setMessage({
        text: `OTP has been sent to ${order?.customer?.phone}`,
        variant: 'info',
      });
      setOpen(true);
    }
  }, [isOtpSuccess]);

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

  useEffect(() => {
    if (orderError) {
      setMessage({
        text: orderError?.data?.message,
        variant: 'error',
      });
    }
  }, [orderError]);

  const handleSubmit = (values) => {
    if (!values) return;

    if (order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled' || values.orderStatus !== 'Delivered') {
      return updateOrder({ id, body: values });
    }

    setValues(values);
    sendOtp({ phone: order?.customer?.phone });
  };

  const handleClick = (otp) => {
    if (!values) return;

    const body = {
      orderStatus: values.orderStatus,
      orderDeliveredBy: values.orderDeliveredBy,
      otp,
      hash,
    };

    updateOrder({ id, body });
  };

  const handleCloseModal = () => {
    setMessage(null);
    setOpen(false);
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
        {(isError || isOrderError) && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{otpError?.data?.message || orderError?.data?.message}</Alert>
          </Stack>
        )}
        {order && (
          <OrderEditForm
            handleOnSubmit={handleSubmit}
            order={order}
            deleverdPersons={deleverdPersons}
            loading={isOtpLoading}
          />
        )}
        <OTPModal
          open={open}
          handleClose={handleCloseModal}
          handleClick={handleClick}
          title="Enter OTP for confirmation"
          message={message}
          isSending={loading}
        />
      </Container>
    </DashboardLayout>
  );
}

export default OrderUpdate;
