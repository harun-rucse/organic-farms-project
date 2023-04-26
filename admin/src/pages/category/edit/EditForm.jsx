import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid } from '@mui/material';
import { Form, FormTextField, FormImagePicker, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  description: Yup.string().label('Description'),
  image: Yup.string().label('Image'),
});

function EditForm({ handleOnSubmit, category, loading }) {
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        name: category?.name,
        description: category?.description,
        image: category?.image,
      }}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      <Grid container spacing={6}>
        <Grid item lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <FormImagePicker name="image" label="Upload image (optional)" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={8} md={6} xs={12}>
          <Card>
            <CardContent>
              <Grid container columnSpacing={4}>
                <Grid item md={12} xs={12}>
                  <FormTextField name="name" label="Category Name" type="text" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="description" label="Description" type="text" minRows={5} multiline fullWidth />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/categories')}
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
  category: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EditForm;
