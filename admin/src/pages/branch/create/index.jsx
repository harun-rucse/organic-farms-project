import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BranchCreateForm from './CreateForm';
import useNotification from '@/hooks/useNotification';
import { useCreateBranchMutation } from '@/store/apiSlices/branchApiSlice';

function BranchCreate() {
  const navigate = useNavigate();
  const notification = useNotification();
  const [createBranch, { isLoading: loading, isSuccess, isError, error }] = useCreateBranchMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Branch created successfully', 'success');
      navigate('/dashboard/branches');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    createBranch(values);
  };

  return (
    <>
      <Helmet>
        <title> Organic-farms | Create new branch </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create new branch
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        <BranchCreateForm handleOnSubmit={handleSubmit} loading={loading} />
      </Container>
    </>
  );
}

export default BranchCreate;
