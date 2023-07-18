import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid } from '@mui/material';
import { Form, FormTextField, FormImagePicker, FormSubmitButton } from '@/components/form';
import { useGetProfileQuery } from '@/store/apiSlices/authApiSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, 'Phone number is not valid')
    .label('Phone'),
  address: Yup.string().required().label('Address'),
  image: Yup.string().label('Image'),
});

function EditForm({ handleOnSubmit, loading }) {
  const { data: currentUser } = useGetProfileQuery();

  return (
    <Form
      initialValues={{
        name: currentUser?.name,
        phone: currentUser?.phone,
        address: currentUser?.address,
        image: currentUser?.image,
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
                  <FormImagePicker name="image" label="Change Profile Image" />
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
                  <FormTextField name="name" label="Full Name" type="text" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="phone" label="Phone number" type="text" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="address" label="Address" type="text" fullWidth required />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <FormSubmitButton label="Update profile" color="primary" loading={loading} />
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
  loading: PropTypes.bool.isRequired,
};

export default EditForm;
