import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Alert } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import useNotification from '@/hooks/useNotification';
import Loader from '@/components/Loader';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllSalariesQuery, useDeleteSalaryMutation } from '@/store/apiSlices/salaryApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

export default function List() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const { data = [], isLoading, isError: isFetchError, error: fetchError } = useGetAllSalariesQuery();
  const [deleteSalary, { isLoading: isDeleting, isSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteSalaryMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Salary deleted successfully', 'success');
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
    deleteSalary(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Salaries </title>
      </Helmet>

      <Container>
        <PageToolbar
          title="Salaries"
          buttonLabel="Add new salary"
          handleOnClick={() => navigate('/dashboard/salary/create')}
        />
        {(isFetchError || isDeleteError) && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{fetchError?.data?.message || deleteError?.data?.message}</Alert>
          </Stack>
        )}
        <Result data={data} handleDeleteClick={handleDeleteClick} />
      </Container>
      <ConfirmDeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        title="Delete Salary"
        description="Are you sure you want to delete this salary?"
        isDeleting={isDeleting}
      />
    </DashboardLayout>
  );
}
