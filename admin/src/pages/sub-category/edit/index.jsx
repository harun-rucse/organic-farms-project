import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SubCategoryEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetAllCategoriesQuery } from '@/store/apiSlices/categoryApiSlice';
import { useGetSubCategoryQuery, useUpdateSubCategoryMutation } from '@/store/apiSlices/subCategoryApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function CategoryUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: categories, isCategoryLoading } = useGetAllCategoriesQuery();
  const { data: subCategory, isLoading: isSubCategoryLoading } = useGetSubCategoryQuery(id);
  const [updateSubCategory, { isLoading: loading, isSuccess, isError, error }] = useUpdateSubCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Sub-category updated successfully', 'success');
      navigate('/dashboard/sub-categories');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    delete values.category;
    updateSubCategory({ id, body: values });
  };

  if (isCategoryLoading || isSubCategoryLoading) {
    return <Loader isLoading={isCategoryLoading || isSubCategoryLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update subcategory </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update subcategory
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {subCategory && (
          <SubCategoryEditForm
            handleOnSubmit={handleSubmit}
            subCategory={subCategory}
            categories={categories}
            loading={loading}
          />
        )}
      </Container>
    </DashboardLayout>
  );
}

export default CategoryUpdate;
