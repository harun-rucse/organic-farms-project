import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Container, Stack, Typography, Alert } from '@mui/material';
import PasswordChangeForm from './PasswordChangeForm';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import useNotification from '@/hooks/useNotification';
import { removeToken } from '@/store/reducers/authReducer';
import { useUpdatePasswordMutation } from '@/store/apiSlices/authApiSlice';

function Settings() {
  const dispatch = useDispatch();
  const notification = useNotification();
  const [updatePassword, { isLoading: loading, isSuccess, isError, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Password change successfully', 'success');

      dispatch(removeToken());
      window.location.reload();
    }
  }, [isSuccess, notification, dispatch]);

  const handleSubmit = (values) => {
    const { currentPassword, password } = values;

    updatePassword({
      currentPassword,
      password,
    });
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Settings </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Change Password
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <PasswordChangeForm handleOnSubmit={handleSubmit} loading={loading} />
      </Container>
    </DashboardLayout>
  );
}

export default Settings;
