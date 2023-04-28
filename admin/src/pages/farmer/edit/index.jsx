import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FarmerEditForm from './EditForm';
import Loader from '@/components/Loader';
import OTPModal from '@/components/OTPModal';
import useNotification from '@/hooks/useNotification';
import { useGetFarmerQuery, useUpdateFarmerMutation } from '@/store/apiSlices/farmerApiSlice';
import { useSendOtpMutation } from '@/store/apiSlices/authApiSlice';

function FarmerUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();
  const [values, setValues] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});
  const [hash, setHash] = useState('');

  const [sendOtp, { isLoading: isOtpLoading, isSuccess: isOtpSuccess, data: otpData, isError, error: otpError }] =
    useSendOtpMutation();
  const { data: farmer, isLoading: isFarmerLoading } = useGetFarmerQuery(id);
  const [updateFarmer, { isLoading: loading, isSuccess, error: farmerError }] = useUpdateFarmerMutation();

  useEffect(() => {
    if (isOtpSuccess) {
      setHash(otpData?.hash);
      setMessage({
        text: `OTP has been sent to ${farmer?.phone}`,
        variant: 'info',
      });
      setOpen(true);
    }
  }, [isOtpSuccess]);

  useEffect(() => {
    if (isSuccess) {
      notification('Farmer updated successfully', 'success');
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
    // phone number is older
    sendOtp({ phone: farmer?.phone });
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
    if (values.image?.length && typeof values.image === 'object') formData.append('image', values.image[0]);
    formData.append('otp', otp);
    formData.append('hash', hash);

    updateFarmer({ id, body: formData });
  };

  const handleCloseModal = () => {
    setMessage(null);
    setOpen(false);
  };

  if (isFarmerLoading) {
    return <Loader isLoading={isFarmerLoading} />;
  }

  return (
    <>
      <Helmet>
        <title> Organic-farms | Update farmer </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update farmer
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{otpError?.data?.message}</Alert>
          </Stack>
        )}
        {farmer && <FarmerEditForm handleOnSubmit={handleSubmit} farmer={farmer} loading={isOtpLoading} />}
        <OTPModal
          open={open}
          handleClose={handleCloseModal}
          handleClick={handleClick}
          title="Enter OTP for confirmation"
          message={message}
          isSending={loading}
        />
      </Container>
    </>
  );
}

export default FarmerUpdate;
