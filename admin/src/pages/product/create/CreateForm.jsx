import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, MenuItem, Button, Avatar, Box } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormImagePicker, FormSubmitButton } from '@/components/form';
import { useGetProfileQuery } from '@/store/apiSlices/authApiSlice';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  subcategory: Yup.string().required().label('Subcategory'),
  price: Yup.number().min(1).required().label('Price'),
  description: Yup.string().label('Description'),
  minimumOrder: Yup.number().min(1).required().label('Minimum Order'),
  maximumOrder: Yup.number().min(1).required().label('Maximum Order'),
  maxDeliveryDays: Yup.number().min(1).required().label('Max Delivery Days'),
  farmer: Yup.string().required().label('Farmer'),
  inStock: Yup.number().min(1).required().label('In Stock'),
  active: Yup.boolean().required().label('Active'),
  branchOffice: Yup.string().required().label('Branch'),
  images: Yup.string().label('Images'),
});

function CreateForm({ handleOnSubmit, subcategories, farmers, branches, loading, setQuery }) {
  const navigate = useNavigate();
  const { data: currentUser } = useGetProfileQuery();

  return (
    <Form
      initialValues={{
        name: '',
        subcategory: '',
        price: '',
        description: '',
        minimumOrder: '',
        maximumOrder: '',
        maxDeliveryDays: '',
        farmer: '',
        inStock: 1,
        active: true,
        branchOffice: currentUser?.role !== 'admin' ? currentUser?.branch._id : '',
        images: '',
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
                  <FormImagePicker name="images" label="Upload images (optional)" multiple />
                </Grid>
                <Grid item md={12} xs={12}>
                  <FormSelectField label="Select status" name="active" fullWidth required>
                    <MenuItem value={true}>Active</MenuItem>
                    <MenuItem value={false}>Inactive</MenuItem>
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
                <Grid item md={12} xs={12}>
                  <FormTextField name="name" label="Product Name" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField
                    label="Select branch"
                    name="branchOffice"
                    fullWidth
                    required
                    disabled={currentUser?.role !== 'admin'}
                    setState={(branch) => {
                      setQuery(`branch=${branch}`);
                    }}
                    f
                  >
                    {branches?.result?.map((branch) => (
                      <MenuItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField label="Select subcategory" name="subcategory" fullWidth required>
                    {subcategories?.result?.map((subcategory) => (
                      <MenuItem key={subcategory._id} value={subcategory._id}>
                        {subcategory.name}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField label="Select farmer" name="farmer" fullWidth required>
                    {farmers?.result?.map((farmer) => (
                      <MenuItem key={farmer._id} value={farmer._id}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <Avatar src={farmer.image} sx={{ width: 24, height: 24, marginRight: 1 }} />
                          {farmer.name}
                          <Box>
                            {`(${farmer.phone.slice(3, 6)}`}***{`${farmer.phone.slice(-3)})`}
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="price" label="Price" type="number" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="minimumOrder" label="Minimum Order" type="number" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="maximumOrder" label="Maximum Order" type="number" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="maxDeliveryDays" label="MaxDeliveryDays" type="number" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="inStock" label="InStock" type="number" fullWidth required />
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="description" label="Description" type="text" fullWidth multiline rows={4} />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/products')}
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
  loading: PropTypes.bool.isRequired,
  subcategories: PropTypes.object.isRequired,
  farmers: PropTypes.object.isRequired,
  branches: PropTypes.object.isRequired,
};

export default CreateForm;
