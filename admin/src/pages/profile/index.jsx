import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfileForm from './EditForm';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import useNotification from '@/hooks/useNotification';
import { useUpdateProfileMutation } from '@/store/apiSlices/authApiSlice';

function Profile() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [updateProfile, { isLoading: loading, isSuccess, isError, error }] = useUpdateProfileMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Profile update successfully', 'success');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    if (values.image.length) formData.append('image', values.image[0]);

    updateProfile(formData);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Profile page </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <ProfileForm handleOnSubmit={handleSubmit} loading={loading} />
      </Container>
    </DashboardLayout>
  );
}

export default Profile;
