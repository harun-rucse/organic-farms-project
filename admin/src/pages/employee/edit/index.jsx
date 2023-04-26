import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetAllBranchesQuery } from '@/store/apiSlices/branchApiSlice';
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from '@/store/apiSlices/employeeApiSlice';

function EmployeeUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: employee, isLoading: isEmployeeLoading } = useGetEmployeeQuery(id);
  const { data: branches, isLoading: isBranchLoading } = useGetAllBranchesQuery();
  const [updateEmployee, { isLoading: loading, isSuccess, isError, error }] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Employee updated successfully', 'success');
      navigate('/dashboard/employees');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('phone', values.phone);
    formData.append('address', values.address);
    formData.append('role', values.role);
    formData.append('salary', values.salary);
    formData.append('verified', values.verified);
    formData.append('branchOffice', values.branchOffice);
    if (values.image?.length && typeof values.image === 'object') formData.append('image', values.image[0]);

    updateEmployee({ id, body: formData });
  };

  if (isEmployeeLoading || isBranchLoading) {
    return <Loader isLoading={isEmployeeLoading || isBranchLoading} />;
  }

  return (
    <>
      <Helmet>
        <title> Organic-farms | Update employee </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update employee
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <EmployeeEditForm handleOnSubmit={handleSubmit} employee={employee} branches={branches} loading={loading} />
      </Container>
    </>
  );
}

export default EmployeeUpdate;
