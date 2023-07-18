import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Alert } from '@mui/material';
import Result from './Result';
import useNotification from '@/hooks/useNotification';
import Loader from '@/components/Loader';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllReviewsQuery, useDeleteReviewMutation } from '@/store/apiSlices/reviewApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export default function List() {
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [query, setQuery] = useState('page=1&limit=5');

  const {
    data = [],
    isLoading,
    isError: isFetchError,
    error: fetchError,
  } = useGetAllReviewsQuery(query ? query : undefined);
  const [deleteReview, { isLoading: isDeleting, isSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Review deleted successfully', 'success');
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
    deleteReview(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Reviews </title>
      </Helmet>

      <Container maxWidth={false}>
        {(isFetchError || isDeleteError) && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{fetchError?.data?.message || deleteError?.data?.message}</Alert>
          </Stack>
        )}
        <Result data={data} setQuery={setQuery} handleDeleteClick={handleDeleteClick} />
      </Container>
      <ConfirmDeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        title="Delete Review"
        description="Are you sure you want to delete this review?"
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
