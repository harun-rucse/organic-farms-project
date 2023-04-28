import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CategoryEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetCategoryQuery, useUpdateCategoryMutation } from '@/store/apiSlices/categoryApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function CategoryUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: category, isLoading: isCategoryLoading } = useGetCategoryQuery(id);
  const [updateCategory, { isLoading: loading, isSuccess, isError, error }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Category updated successfully', 'success');
      navigate('/dashboard/categories');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    if (values.description) formData.append('description', values.description);
    if (values.image?.length && typeof values.image === 'object') formData.append('image', values.image[0]);

    updateCategory({ id, body: formData });
  };

  if (isCategoryLoading) {
    return <Loader isLoading={isCategoryLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update category </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update category
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {category && <CategoryEditForm handleOnSubmit={handleSubmit} category={category} loading={loading} />}
      </Container>
    </DashboardLayout>
  );
}

export default CategoryUpdate;
