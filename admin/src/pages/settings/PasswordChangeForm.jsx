import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, InputAdornment, IconButton } from '@mui/material';
import { Form, FormTextField, FormSubmitButton } from '@/components/form';
import Iconify from '@/components/iconify';

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().min(6).required().label('Current Password'),
  password: Yup.string().min(6).required().label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required()
    .label('Confirm Password'),
});

function PasswordChangeForm({ handleOnSubmit, loading }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form
      initialValues={{
        currentPassword: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      <Grid spacing={6}>
        <Grid item lg={8} md={6} xs={12}>
          <Card>
            <CardContent>
              <Grid container columnSpacing={4}>
                <Grid item md={12} xs={12}>
                  <FormTextField
                    name="currentPassword"
                    label="Current Password"
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
                    fullWidth
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField
                    name="password"
                    label="New Password"
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
                    fullWidth
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField
                    name="confirmPassword"
                    label="Confirm Password"
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
                    fullWidth
                  />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <FormSubmitButton label="Change Password" color="primary" loading={loading} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

PasswordChangeForm.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PasswordChangeForm;
