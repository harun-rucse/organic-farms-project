import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewEditForm from './EditForm';
import Loader from '@/components/Loader';
import useNotification from '@/hooks/useNotification';
import { useGetReviewQuery, useUpdateReviewMutation } from '@/store/apiSlices/reviewApiSlice';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';

function ReviewUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notification = useNotification();

  const { data: review, isLoading: isReviewLoading } = useGetReviewQuery(id);
  const [updateReview, { isLoading: loading, isSuccess, isError, error }] = useUpdateReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      notification('Review updated successfully', 'success');
      navigate('/dashboard/reviews');
    }
  }, [isSuccess, navigate, notification]);

  const handleSubmit = (values) => {
    const body = {
      rating: values.rating,
      review: values.review,
    };

    updateReview({ id, body });
  };

  if (isReviewLoading) {
    return <Loader isLoading={isReviewLoading} />;
  }

  return (
    <DashboardLayout>
      <Helmet>
        <title> Organic-farms | Update review </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Update review
          </Typography>
        </Stack>
        {isError && (
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Alert severity="error">{error?.data?.message}</Alert>
          </Stack>
        )}
        {review && <ReviewEditForm handleOnSubmit={handleSubmit} review={review} loading={loading} />}
      </Container>
    </DashboardLayout>
  );
}

export default ReviewUpdate;
