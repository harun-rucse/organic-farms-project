import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Alert } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import useNotification from '@/hooks/useNotification';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import Loader from '@/components/Loader';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllBranchesQuery, useDeleteBranchMutation } from '@/store/apiSlices/branchApiSlice';

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
  } = useGetAllBranchesQuery(query ? query : undefined);
  const [deleteBranch, { isLoading: isDeleting, isSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteBranchMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Branch deleted successfully', 'success');
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
    deleteBranch(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Branches </title>
      </Helmet>

      <Container maxWidth={false}>
        <PageToolbar
          title="Branches"
          buttonLabel="Add new branch"
          handleOnClick={() => navigate('/dashboard/branch/create')}
        />
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
        title="Delete Branch"
        description="Are you sure you want to delete this branch?"
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
