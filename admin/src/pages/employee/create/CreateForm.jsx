import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, MenuItem, InputAdornment, IconButton, Button } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormImagePicker, FormSwitch, FormSubmitButton } from '@/components/form';
import Iconify from '@/components/iconify';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, 'Phone number is not valid')
    .label('Phone'),
  address: Yup.string().required().label('Address'),
  password: Yup.string().min(6).required().label('Password'),
  role: Yup.string().required().label('Role'),
  salary: Yup.number().min(1).required().label('Salary'),
  verified: Yup.bool().required().label('Verified'),
  branchOffice: Yup.string().required().label('Branch'),
  image: Yup.string().label('Image'),
});

const roles = ['admin', 'branch-manager', 'office-employee', 'warehouse-employee', 'delivery-person'];

function CreateForm({ handleOnSubmit, branches, loading }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form
      initialValues={{
        name: '',
        phone: '+880',
        address: '',
        password: '',
        role: '',
        salary: '',
        verified: false,
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
                  <FormSelectField label="Select role" name="role" fullWidth required>
                    {roles?.map((role, indx) => (
                      <MenuItem key={indx} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1).replace(/-/g, ' ')}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormSwitch name="verified" label="Employee Verified" required />
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
                  <FormTextField name="name" label="Employee Name" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="phone" label="Phone number" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="address" label="Address" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField label="Select branch" name="branchOffice" fullWidth required>
                    {branches?.map((branch) => (
                      <MenuItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="salary" label="Salary" type="number" fullWidth required />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/employees')}
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
  branches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CreateForm;
