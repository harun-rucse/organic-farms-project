import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Grid } from '@mui/material';
import { Form, FormTextField, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, 'Phone number is not valid')
    .label('Phone'),
  address: Yup.string().required().label('Address'),
  deliveryFee: Yup.number().min(1).required().label('Delivery Fee'),
  costPercentage: Yup.number().min(1).required().label('Cost Percentage'),
});

function CreateForm({ handleOnSubmit, loading }) {
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        name: '',
        phone: '+880',
        address: '',
        deliveryFee: '',
        costPercentage: '',
      }}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      <Grid container spacing={6}>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <Grid container columnSpacing={4}>
                <Grid item md={6} xs={12}>
                  <FormTextField name="name" label="Branch Name" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="phone" label="Phone number" type="text" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="address" label="Address" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField
                    name="deliveryFee"
                    label="Delivery Fee"
                    placeholder="Tk. per kg"
                    type="number"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField
                    name="costPercentage"
                    label="Cost Percentage"
                    placeholder="Percentage of total order amount"
                    type="number"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/branches')}
                    sx={{
                      marginRight: 2,
                    }}
                  >
                    Back
                  </Button>
                  <FormSubmitButton label="Create new" color="primary" loading={loading} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

CreateForm.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateForm;
