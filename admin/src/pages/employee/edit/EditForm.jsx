import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Grid, MenuItem } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormImagePicker, FormSwitch, FormSubmitButton } from '@/components/form';
import { useGetProfileQuery } from '@/store/apiSlices/authApiSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, 'Phone number is not valid')
    .label('Phone'),
  address: Yup.string().required().label('Address'),
  role: Yup.string().required().label('Role'),
  salary: Yup.number().min(1).required().label('Salary'),
  verified: Yup.bool().required().label('Verified'),
  branchOffice: Yup.string().required().label('Branch'),
  image: Yup.string().label('Image'),
});

function EditForm({ handleOnSubmit, employee, branches, loading }) {
  const navigate = useNavigate();
  const { data: currentUser } = useGetProfileQuery();

  const roles =
    currentUser?.role === 'admin'
      ? ['admin', 'branch-manager', 'office-employee', 'warehouse-employee', 'delivery-person']
      : ['office-employee', 'warehouse-employee', 'delivery-person'];

  return (
    <Form
      initialValues={{
        name: employee.user?.name,
        phone: employee.user?.phone,
        address: employee.user?.address,
        role: employee.role,
        salary: employee.salary,
        verified: employee.user?.verified,
        branchOffice: employee.branchOffice?._id,
        image: employee.user?.image,
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
                {currentUser?.role === 'admin' && (
                  <Grid item md={12} xs={12}>
                    <FormSwitch name="verified" label="Employee Verified" required />
                  </Grid>
                )}
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

                <Grid item md={12} xs={12}>
                  <FormTextField name="address" label="Address" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField
                    label="Select branch"
                    name="branchOffice"
                    fullWidth
                    required
                    disabled={currentUser?.role !== 'admin'}
                  >
                    {branches?.result?.map((branch) => (
                      <MenuItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </FormSelectField>
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
  employee: PropTypes.object.isRequired,
  branches: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EditForm;
