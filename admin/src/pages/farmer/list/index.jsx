import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import useNotification from '@/hooks/useNotification';
import Loader from '@/components/Loader';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllFarmersQuery, useDeleteFarmerMutation } from '@/store/apiSlices/farmerApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export default function List() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const { data = [], isLoading } = useGetAllFarmersQuery();
  const [deleteFarmer, { isLoading: isDeleting, isSuccess }] = useDeleteFarmerMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Farmer deleted successfully', 'success');
    }
  }, [isSuccess]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    deleteFarmer(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Farmers </title>
      </Helmet>

      <Container>
        <PageToolbar
          title="Farmers"
          buttonLabel="Add new farmer"
          handleOnClick={() => navigate('/dashboard/farmer/create')}
        />
        <Result data={data} handleDeleteClick={handleDeleteClick} />
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
