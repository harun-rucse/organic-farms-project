import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import BranchEditForm from './EditForm';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetBranchQuery, useUpdateBranchMutation } from '@/store/apiSlices/branchApiSlice';

function BranchUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: branch, isLoading: isBranchLoading } = useGetBranchQuery(id);
  const [updateBranch, { isLoading: loading, isSuccess, isError, error }] = useUpdateBranchMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Branch updated successfully', 'success');
      navigate('/dashboard/branches');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    updateBranch({ id, body: values });
  };

  if (isBranchLoading) {
    return <Loader isLoading={isBranchLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update branch </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update branch
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {branch && <BranchEditForm handleOnSubmit={handleSubmit} branch={branch} loading={loading} />}
      </Container>
    </DashboardLayout>
  );
}

export default BranchUpdate;
