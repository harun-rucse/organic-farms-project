import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import useNotification from '@/hooks/useNotification';
import Loader from '@/components/Loader';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllSubCategoriesQuery, useDeleteSubCategoryMutation } from '@/store/apiSlices/subCategoryApiSlice';

export default function List() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const { data = [], isLoading } = useGetAllSubCategoriesQuery();
  const [deleteSubCategory, { isLoading: isDeleting, isSuccess }] = useDeleteSubCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Subcategory deleted successfully', 'success');
    }
  }, [isSuccess]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    deleteSubCategory(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <>
      <Helmet>
        <title> Organic-farms | Sub-categories </title>
      </Helmet>

      <Container>
        <PageToolbar
          title="Subcategories"
          buttonLabel="Add new subcategory"
          handleOnClick={() => navigate('/dashboard/sub-category/create')}
        />
        <Result data={data} handleDeleteClick={handleDeleteClick} />
      </Container>
      <ConfirmDeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        title="Delete subcategory"
        description="Are you sure you want to delete this subcategory?"
        isDeleting={isDeleting}
      />
    </>
  );
}
