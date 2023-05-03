import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ProductEditForm from './EditForm';
import Loader from '@/components/Loader';
import OTPModal from '@/components/OTPModal';
import useNotification from '@/hooks/useNotification';
import { useGetAllSubCategoriesQuery } from '@/store/apiSlices/subCategoryApiSlice';
import { useGetProductQuery, useUpdateProductMutation } from '@/store/apiSlices/productApiSlice';
import { useGetAllFarmersQuery } from '@/store/apiSlices/farmerApiSlice';
import { useSendOtpMutation } from '@/store/apiSlices/authApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function ProductUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();
  const [values, setValues] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});
  const [hash, setHash] = useState('');

  const [sendOtp, { isLoading: isOtpLoading, isSuccess: isOtpSuccess, data: otpData, isError, error: otpError }] =
    useSendOtpMutation();
  const { data: subcategories, isLoading } = useGetAllSubCategoriesQuery();
  const { data: farmers, isLoading: isFarmerLoading } = useGetAllFarmersQuery();
  const { data: product, isLoading: isProductLoading } = useGetProductQuery(id);
  const [updateProduct, { isLoading: loading, isSuccess, error: productError }] = useUpdateProductMutation();

  useEffect(() => {
    if (isOtpSuccess) {
      setHash(otpData?.hash);
      setMessage({
        text: `OTP has been sent to ${product?.farmer?.phone}`,
        variant: 'info',
      });
      setOpen(true);
    }
  }, [isOtpSuccess]);

  useEffect(() => {
    if (isSuccess) {
      notification('Product updated successfully', 'success');
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
    setValues(values);
    sendOtp({ phone: product?.farmer?.phone });
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
    formData.append('inStock', values.inStock);
    formData.append('active', values.active);

    if (values.images?.length) {
      [...values.images].forEach((image) => {
        if (typeof image === 'object') formData.append('images', image);
      });
    }

    formData.append('otp', otp);
    formData.append('hash', hash);

    updateProduct({ id, body: formData });
  };

  const handleCloseModal = () => {
    setMessage(null);
    setOpen(false);
  };

  if (isLoading || isFarmerLoading || isProductLoading) {
    return <Loader isLoading={isLoading || isFarmerLoading || isProductLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update product </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update product
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{otpError?.data?.message}</Alert>
          </Stack>
        )}
        {product && (
          <ProductEditForm
            handleOnSubmit={handleSubmit}
            product={product}
            subcategories={subcategories}
            farmers={farmers}
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

export default ProductUpdate;
