import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoryCreateForm from './CreateForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useCreateCategoryMutation } from '@/store/apiSlices/categoryApiSlice';

function EmployeeCreate() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [createCategory, { isLoading: loading, isSuccess, isError, error }] = useCreateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Category created successfully', 'success');
      navigate('/dashboard/categories');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    if (values.description) formData.append('description', values.description);
    if (values.image.length) formData.append('image', values.image[0]);

    createCategory(formData);
  };

  return (
    <>
      <Helmet>
        <title> Organic-farms | Create new category </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create new category
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <CategoryCreateForm handleOnSubmit={handleSubmit} loading={loading} />
      </Container>
    </>
  );
}

export default EmployeeCreate;
