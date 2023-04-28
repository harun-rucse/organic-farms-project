import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import useNotification from '@/hooks/useNotification';
import Loader from '@/components/Loader';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllFarmerCardsQuery, useDeleteFarmerCardMutation } from '@/store/apiSlices/farmerCardApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export default function List() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const { data = [], isLoading } = useGetAllFarmerCardsQuery();
  const [deleteFarmerCard, { isLoading: isDeleting, isSuccess }] = useDeleteFarmerCardMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Card deleted successfully', 'success');
    }
  }, [isSuccess]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    deleteFarmerCard(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Farmers-card </title>
      </Helmet>

      <Container>
        <Result data={data} handleDeleteClick={handleDeleteClick} />
      </Container>
      <ConfirmDeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        title="Delete card"
        description="Are you sure you want to delete this card?"
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
