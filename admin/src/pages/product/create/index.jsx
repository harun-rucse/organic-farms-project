import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCreateForm from './CreateForm';
import Loader from '@/components/Loader';
import OTPModal from '@/components/OTPModal';
import useNotification from '@/hooks/useNotification';
import { useGetAllSubCategoriesQuery } from '@/store/apiSlices/subCategoryApiSlice';
import { useGetAllBranchesQuery } from '@/store/apiSlices/branchApiSlice';
import { useGetAllFarmersQuery } from '@/store/apiSlices/farmerApiSlice';
import { useCreateProductMutation } from '@/store/apiSlices/productApiSlice';
import { useSendOtpMutation } from '@/store/apiSlices/authApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function ProductCreate() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [values, setValues] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});
  const [query, setQuery] = useState('');

  const { data: subcategories, isLoading } = useGetAllSubCategoriesQuery();
  const { data: farmers, isLoading: isFarmerLoading } = useGetAllFarmersQuery(query ? query : undefined);
  const { data: branches, isLoading: isBranchLoading } = useGetAllBranchesQuery();
  const [sendOtp, { isLoading: isOtpLoading, isSuccess: isOtpSuccess, data: otpData, isError, error: otpError }] =
    useSendOtpMutation();
  const [createProduct, { isLoading: loading, isSuccess, error: productError }] = useCreateProductMutation();

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
      notification('Product created successfully', 'success');
      setOpen(false);
      navigate('/dashboard/products');
    }
  }, [isSuccess, navigate, notification]);

  useEffect(() => {
    if (productError) {
      setMessage({
        text: productError?.data?.message,
        variant: 'error',
      });
    }
  }, [productError]);

  const handleSubmit = (values) => {
    const farmer = farmers?.find((farmer) => farmer._id === values.farmer);

    setValues({ ...values, phone: farmer?.phone });
    sendOtp({ phone: farmer?.phone });
  };

  const handleClick = (otp) => {
    if (!values) return;

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('subcategory', values.subcategory);
    formData.append('price', values.price);
    if (values.description) formData.append('description', values.description);
    formData.append('minimumOrder', values.minimumOrder);
    formData.append('maximumOrder', values.maximumOrder);
    formData.append('maxDeliveryDays', values.maxDeliveryDays);
    formData.append('farmer', values.farmer);
    formData.append('inStock', values.inStock);
    formData.append('active', values.active);
    formData.append('branchOffice', values.branchOffice);

    if (values.images?.length) {
      [...values.images].forEach((image) => {
        formData.append('images', image);
      });
    }

    formData.append('otp', otp);
    formData.append('hash', otpData?.hash);

    createProduct(formData);
  };

  const handleCloseModal = () => {
    setMessage(null);
    setOpen(false);
  };

  if (isLoading || isFarmerLoading || isBranchLoading) {
    return <Loader isLoading={isLoading || isFarmerLoading || isBranchLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Create new product </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create new product
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{otpError?.data?.message}</Alert>
          </Stack>
        )}
        <ProductCreateForm
          handleOnSubmit={handleSubmit}
          subcategories={subcategories}
          farmers={farmers}
          branches={branches}
          loading={isOtpLoading}
          setQuery={setQuery}
        />
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

export default ProductCreate;
