import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import useNotification from '@/hooks/useNotification';
import Loader from '@/components/Loader';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from '@/store/apiSlices/categoryApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export default function List() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const { data = [], isLoading } = useGetAllCategoriesQuery();
  const [deleteCategory, { isLoading: isDeleting, isSuccess }] = useDeleteCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Category deleted successfully', 'success');
    }
  }, [isSuccess]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    deleteCategory(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Categories </title>
      </Helmet>

      <Container>
        <PageToolbar
          title="Categories"
          buttonLabel="Add new category"
          handleOnClick={() => navigate('/dashboard/category/create')}
        />
        <Result data={data} handleDeleteClick={handleDeleteClick} />
      </Container>
      <ConfirmDeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
