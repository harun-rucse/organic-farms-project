import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Alert } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import DashboardLayout from '@/layouts/dashboard';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllProductsQuery, useDeleteProductMutation } from '@/store/apiSlices/productApiSlice';

export default function List() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [query, setQuery] = useState('page=1&limit=5');

  const {
    data = [],
    isLoading,
    isError: isFetchError,
    error: fetchError,
  } = useGetAllProductsQuery(query ? query : undefined);
  const [deleteProduct, { isLoading: isDeleting, isSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Product deleted successfully', 'success');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isDeleteError) {
      setOpen(false);
    }
  }, [isDeleteError]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    deleteProduct(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Products </title>
      </Helmet>

      <Container maxWidth={false}>
        <PageToolbar
          title="Products"
          buttonLabel="Add new product"
          handleOnClick={() => navigate('/dashboard/product/create')}
        />
        {(isDeleteError || isFetchError) && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{deleteError?.data?.message || fetchError?.data?.message}</Alert>
          </Stack>
        )}
        <Result data={data} setQuery={setQuery} handleDeleteClick={handleDeleteClick} />
      </Container>
      <ConfirmDeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
