import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmployeeCreateForm from './CreateForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetAllBranchesQuery } from '@/store/apiSlices/branchApiSlice';
import { useCreateEmployeeMutation } from '@/store/apiSlices/employeeApiSlice';

function EmployeeCreate() {
  const navigate = useNavigate();
  const notification = useNotification();
  const { data: branches, isLoading } = useGetAllBranchesQuery();
  const [createEmployee, { isLoading: loading, isSuccess, isError, error }] = useCreateEmployeeMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Employee created successfully', 'success');
      navigate('/dashboard/employees');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append('password', values.password);
    formData.append('role', values.role);
    formData.append('salary', values.salary);
    formData.append('verified', values.verified);
    formData.append('branchOffice', values.branchOffice);
    if (values.image.length) formData.append('image', values.image[0]);

    createEmployee(formData);
  };

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <>
      <Helmet>
        <title> Organic-farms | Create new employee </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create new employee
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <EmployeeCreateForm handleOnSubmit={handleSubmit} branches={branches} loading={loading} />
      </Container>
    </>
  );
}

export default EmployeeCreate;
