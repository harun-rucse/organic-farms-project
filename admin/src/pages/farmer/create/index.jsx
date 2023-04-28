import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FarmerCreateForm from './CreateForm';
import Loader from '@/components/Loader';
import OTPModal from '@/components/OTPModal';
import useNotification from '@/hooks/useNotification';
import { useGetAllBranchesQuery } from '@/store/apiSlices/branchApiSlice';
import { useCreateFarmerMutation } from '@/store/apiSlices/farmerApiSlice';
import { useSendOtpMutation } from '@/store/apiSlices/authApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function EmployeeCreate() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [values, setValues] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});

  const { data: branches, isLoading } = useGetAllBranchesQuery();
  const [sendOtp, { isLoading: isOtpLoading, isSuccess: isOtpSuccess, data: otpData, isError, error: otpError }] =
    useSendOtpMutation();
  const [createFarmer, { isLoading: loading, isSuccess, error: farmerError }] = useCreateFarmerMutation();

  useEffect(() => {
    if (isOtpSuccess) {
      setMessage({
        text: `OTP has been sent to ${values?.phone}`,
        variant: 'info',
      });
      setOpen(true);
    }
  }, [isOtpSuccess]);

  useEffect(() => {
    if (isSuccess) {
      notification('Farmer created successfully', 'success');
      setOpen(false);
      navigate('/dashboard/farmers');
    }
  }, [isSuccess, navigate, notification]);

  useEffect(() => {
    if (farmerError) {
      setMessage({
        text: farmerError?.data?.message,
        variant: 'error',
      });
    }
  }, [farmerError]);

  const handleSubmit = (values) => {
    setValues(values);
    sendOtp({ phone: values.phone });
  };

  const handleClick = (otp) => {
    if (!values) return;

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append(
      'receivePayment',
      JSON.stringify({ type: values.receivePaymentType, number: values.receivePaymentNumber })
    );
    if (values.description) formData.append('description', values.description);
    formData.append('identity', values.identity);
    formData.append('branchOffice', values.branchOffice);
    if (values.image.length) formData.append('image', values.image[0]);
    formData.append('otp', otp);
    formData.append('hash', otpData?.hash);

    createFarmer(formData);
  };

  const handleCloseModal = () => {
    setMessage(null);
    setOpen(false);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Create new farmer </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create new farmer
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{otpError?.data?.message}</Alert>
          </Stack>
        )}
        <FarmerCreateForm handleOnSubmit={handleSubmit} branches={branches} loading={isOtpLoading} />
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

export default EmployeeCreate;
