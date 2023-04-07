import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, CardHeader, Divider, Grid, Button } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormSubmitButton } from '../../../components/form';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Product name'),
  category: Yup.string().required().label('Category'),
  price: Yup.number().required().label('Price'),
  serves: Yup.string().required().label('Serves'),
  description: Yup.string().required().label('Description'),
  ingredients: Yup.string().required().label('Ingredients'),
});

function EmployeeForm({ handleOnSubmit }) {
  return (
    <Form
      initialValues={{
        name: '',
        category: '',
        price: '',
        serves: '',
        description: '',
        ingredients: '',
        image: '',
      }}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      <Grid container spacing={6}>
        <Grid item lg={4} md={6} xs={12}>
          <Card>
            <CardHeader title="Product Category" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <FormSelectField fullWidth label="Select product category" name="category" required>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </FormSelectField>
                </Grid>
                <Grid item md={12} xs={12}>
                  <h1>Image picker</h1>
                  {/* <FormImagePicker name="image" label="Drag and drop an image here or click" /> */}
                </Grid>
              </Grid>
            </CardContent>
            <Divider />

            <Box display="flex" justifyContent="flex-end" p={2}>
              <FormSubmitButton label="Create new" color="primary" />
            </Box>
          </Card>
        </Grid>

        <Grid item lg={8} md={6} xs={12}>
          <Card>
            <CardContent>
              <Grid container columnSpacing={4}>
                <Grid item md={6} xs={12}>
                  <FormTextField name="name" label="Employee Name" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="phone" label="Phone number" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="address" label="Address" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="password" label="Password" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="salary" label="Salary" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="branch" label="Branch" type="text" fullWidth required />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <FormSubmitButton label="Create new" color="success" />
                </Grid>

                {/* <Box display="flex" justifyContent="flex-end">
                  <FormSubmitButton label="Create new" color="primary" />
                </Box> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

EmployeeForm.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
};

export default EmployeeForm;
