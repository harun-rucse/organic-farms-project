import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SalaryEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetAllBranchesQuery } from '@/store/apiSlices/branchApiSlice';
import { useGetAllEmployeesQuery } from '@/store/apiSlices/employeeApiSlice';
import { useGetSalaryQuery, useUpdateSalaryMutation } from '@/store/apiSlices/salaryApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function SalaryUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: branches, isLoading: isBranchLoading } = useGetAllBranchesQuery();
  const { data: employees, isLoading: isEmployeeLoading } = useGetAllEmployeesQuery();
  const { data: salary, isLoading: isSalaryLoading } = useGetSalaryQuery(id);
  const [updateSalary, { isLoading: loading, isSuccess, isError, error }] = useUpdateSalaryMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Salary updated successfully', 'success');
      navigate('/dashboard/salaries');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const body = {
      month: values.month,
      year: values.year,
      paymentMethod: values.paymentMethod,
      status: values.status,
    };

    updateSalary({ id, body });
  };

  if (isBranchLoading || isSalaryLoading || isEmployeeLoading) {
    return <Loader isLoading={isBranchLoading || isSalaryLoading || isEmployeeLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update salary </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update salary
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {salary && (
          <SalaryEditForm
            handleOnSubmit={handleSubmit}
            salary={salary}
            branches={branches}
            employees={employees}
            loading={loading}
          />
        )}
      </Container>
    </DashboardLayout>
  );
}

export default SalaryUpdate;
