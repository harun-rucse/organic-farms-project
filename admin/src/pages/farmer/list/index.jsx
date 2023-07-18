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
import { useGetAllFarmersQuery, useDeleteFarmerMutation } from '@/store/apiSlices/farmerApiSlice';
import { useCreateFarmerCardMutation } from '@/store/apiSlices/farmerCardApiSlice';

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
  } = useGetAllFarmersQuery(query ? query : undefined);
  const [deleteFarmer, { isLoading: isDeleting, isSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteFarmerMutation();
  const [createFarmerCard, { data: cardData, isSuccess: isCreated, isError, error: cardError }] =
    useCreateFarmerCardMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Farmer deleted successfully', 'success');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isDeleteError) {
      setOpen(false);
    }
  }, [isDeleteError]);

  useEffect(() => {
    if (isCreated) {
      navigate(`/dashboard/farmer-card/view/${cardData._id}`);
    }
  }, [isCreated]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    deleteFarmer(deleteId);
  };

  const handleCreateCard = (id) => {
    createFarmerCard({ farmer: id });
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Farmers </title>
      </Helmet>

      <Container maxWidth={false}>
        <PageToolbar
          title="Farmers"
          buttonLabel="Add new farmer"
          handleOnClick={() => navigate('/dashboard/farmer/create')}
        />
        {(isError || isDeleteError || isFetchError) && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">
              {cardError?.data?.message || deleteError?.data?.message || fetchError?.data?.message}
            </Alert>
          </Stack>
        )}
        <Result
          data={data}
          setQuery={setQuery}
          handleDeleteClick={handleDeleteClick}
          handleCreateCard={handleCreateCard}
        />
      </Container>
      <ConfirmDeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        title="Delete Farmer"
        description="Are you sure you want to delete this farmer?"
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
