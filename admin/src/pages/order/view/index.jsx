import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Stack, Alert, Button, Card } from '@mui/material';
import DashboardLayout from '@/layouts/dashboard';
import Loader from '@/components/Loader';
import OrderDetailsForm from './DetailsForm';
import { useGetOrderQuery } from '@/store/apiSlices/orderApiSlice';

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: order, isLoading, isError, error } = useGetOrderQuery(id);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Details </title>
      </Helmet>

      <Container>
        <Card sx={{ mx: 3, p: 2, mb: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" color="error" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="outlined" color="primary" onClick={() => navigate(`/dashboard/order/${id}/pdf`)}>
              Print
            </Button>
          </Stack>
        </Card>

        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {order && <OrderDetailsForm order={order} />}
      </Container>
    </DashboardLayout>
  );
}
