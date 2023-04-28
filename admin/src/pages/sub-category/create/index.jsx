import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubCategoryCreateForm from './CreateForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetAllCategoriesQuery } from '@/store/apiSlices/categoryApiSlice';
import { useCreateSubCategoryMutation } from '@/store/apiSlices/subCategoryApiSlice';

function SubCategoryCreate() {
  const navigate = useNavigate();
  const notification = useNotification();
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const [createSubCategory, { isLoading: loading, isSuccess, isError, error }] = useCreateSubCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Subcategory created successfully', 'success');
      navigate('/dashboard/sub-categories');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    createSubCategory(values);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title> Organic-farms | Create new subcategory </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create new subcategory
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <SubCategoryCreateForm handleOnSubmit={handleSubmit} categories={categories} loading={loading} />
      </Container>
    </>
  );
}

export default SubCategoryCreate;
