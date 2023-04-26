import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Result from './Result';
import PageToolbar from '@/components/PageToolbar';
import useNotification from '@/hooks/useNotification';
import Loader from '@/components/Loader';
import ConfirmDeleteModal from '@/components/ConfirmDelete';
import { useGetAllEmployeesQuery, useDeleteEmployeeMutation } from '@/store/apiSlices/employeeApiSlice';

export default function List() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const { data = [], isLoading } = useGetAllEmployeesQuery();
  const [deleteEmployee, { isLoading: isDeleting, isSuccess }] = useDeleteEmployeeMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      notification('Employee deleted successfully', 'success');
    }
  }, [isSuccess]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    deleteEmployee(deleteId);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <>
      <Helmet>
        <title> Organic-farms | Employees </title>
      </Helmet>

      <Container>
        <PageToolbar
          title="Employees"
          buttonLabel="Add new employee"
          handleOnClick={() => navigate('/dashboard/employee/create')}
        />
        <Result data={data} handleDeleteClick={handleDeleteClick} />
      </Container>
      <ConfirmDeleteModal
        open={open}
        handleClose={() => setOpen(false)}
        handleDelete={handleDelete}
        title="Delete Employee"
        description="Are you sure you want to delete this employee?"
        isDeleting={isDeleting}
      />
    </>
  );
}
