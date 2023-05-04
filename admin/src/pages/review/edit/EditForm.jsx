import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid } from '@mui/material';
import { Form, FormTextField, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  review: Yup.string().required().label('Review'),
  rating: Yup.number().min(1).max(5).required().label('Rating'),
});

function EditForm({ handleOnSubmit, review, loading }) {
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        review: review?.review || '',
        rating: review?.rating || '',
      }}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      <Grid container spacing={6}>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <Grid container columnSpacing={4}>
                <Grid item md={12} xs={12}>
                  <FormTextField name="rating" label="Rating" type="number" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="review" label="Review" type="text" minRows={5} multiline fullWidth />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/reviews')}
                    sx={{
                      marginRight: 2,
                    }}
                  >
                    Back
                  </Button>
                  <FormSubmitButton label="Update now" color="primary" loading={loading} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

EditForm.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  review: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EditForm;
