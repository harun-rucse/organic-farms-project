import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, MenuItem, Button } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormImagePicker, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, 'Phone number is not valid')
    .label('Phone'),
  address: Yup.string().required().label('Address'),
  receivePaymentType: Yup.string().required().label('Payment type'),
  receivePaymentNumber: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, 'Phone number is not valid')
    .label('Phone'),
  description: Yup.string().label('Description'),
  identity: Yup.string().required().label('Identity'),
  branchOffice: Yup.string().label('Branch'),
  image: Yup.string().label('Image'),
});

const types = ['bKash', 'Rocket', 'Nagad', 'Bank'];

function CreateForm({ handleOnSubmit, branches, loading }) {
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        name: '',
        phone: '+880',
        address: '',
        receivePaymentType: '',
        receivePaymentNumber: '+880',
        description: '',
        identity: '',
        branchOffice: '',
        image: '',
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
                <Grid item md={12} xs={12}>
                  <FormSelectField label="Select branch" name="branchOffice" fullWidth required>
                    {branches?.map((branch) => (
                      <MenuItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={8} md={6} xs={12}>
          <Card>
            <CardContent>
              <Grid container columnSpacing={4}>
                <Grid item md={6} xs={12}>
                  <FormTextField name="name" label="Farmer Name" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="phone" label="Phone number" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="address" label="Address" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="identity" label="Identity" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField label="Select payment type" name="receivePaymentType" fullWidth required>
                    {types.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="receivePaymentNumber" label="Payment number" type="text" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="description" label="Description" type="text" fullWidth multiline rows={4} />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/farmers')}
                    sx={{
                      marginRight: 2,
                    }}
                  >
                    Back
                  </Button>

                  <FormSubmitButton label="Send OTP" color="primary" loading={loading} />
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
  branches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateForm;
