import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid } from '@mui/material';
import { Form, FormTextField, FormSwitch, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, 'Phone number is not valid')
    .label('Phone'),
  address: Yup.string().required().label('Address'),
  verified: Yup.boolean().required().label('Verified'),
});

function EditForm({ handleOnSubmit, customer, loading }) {
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        verified: customer.verified,
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
                  <FormTextField name="name" label="Customer Name" type="text" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="phone" label="Customer Phone" type="text" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="address" label="Address" type="text" minRows={5} multiline fullWidth />
                </Grid>

                <Grid item md={12} xs={12} mt={2}>
                  <FormSwitch name="verified" label="Customer Verified" required />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/customers')}
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
  customer: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EditForm;
