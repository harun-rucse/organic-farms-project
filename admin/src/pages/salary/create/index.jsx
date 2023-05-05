import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SalaryCreateForm from './CreateForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useCreateSalaryMutation } from '@/store/apiSlices/salaryApiSlice';
import { useGetAllBranchesQuery } from '@/store/apiSlices/branchApiSlice';
import { useGetAllEmployeesQuery } from '@/store/apiSlices/employeeApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function SalaryCreate() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [query, setQuery] = useState('');

  const { data: branches, isLoading: isBranchLoading } = useGetAllBranchesQuery();
  const { data: employees, isLoading: isEmployeeLoading } = useGetAllEmployeesQuery(query ? query : undefined);
  const [createSalary, { isLoading: loading, isSuccess, isError, error }] = useCreateSalaryMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Salary created successfully', 'success');
      navigate('/dashboard/salaries');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const body = {
      month: values.month,
      year: values.year,
      employee: values.employee,
      paymentMethod: values.paymentMethod,
      status: values.status,
    };

    createSalary(body);
  };

  if (isBranchLoading || isEmployeeLoading) {
    return <Loader isLoading={isBranchLoading || isEmployeeLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Create new salary </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create new salary
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <SalaryCreateForm
          handleOnSubmit={handleSubmit}
          branches={branches}
          employees={employees}
          loading={loading}
          setQuery={setQuery}
        />
      </Container>
    </DashboardLayout>
  );
}

export default SalaryCreate;
