import React from 'react';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Button, MenuItem } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormDatePicker, FormSubmitButton } from '@/components/form';
import { useGetProfileQuery } from '@/store/apiSlices/authApiSlice';

const validationSchema = Yup.object().shape({
  category: Yup.string().required().label('Category'),
  amount: Yup.number().min(1).required().label('Amount'),
  description: Yup.string().required().label('Description'),
  date: Yup.date().required().label('Date'),
  branchOffice: Yup.string().required().label('Branch Office'),
});

const categories = ['Operations', 'Marketing', 'Rent', 'Transport', 'Utility', 'Other'];

function CreateForm({ handleOnSubmit, branches, loading }) {
  const navigate = useNavigate();
  const { data: currentUser } = useGetProfileQuery();

  return (
    <Form
      initialValues={{
        category: '',
        amount: '',
        description: '',
        date: dayjs(Date.now()),
        branchOffice: currentUser?.role !== 'admin' ? currentUser?.branch._id : '',
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
                  <FormSelectField label="Select expense category" name="category" fullWidth required>
                    {categories?.map((category, indx) => (
                      <MenuItem key={indx} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="amount" label="Amount" type="number" fullWidth />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormDatePicker name="date" label="Choose Date" fullWidth disableFuture />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField
                    label="Select branch"
                    name="branchOffice"
                    fullWidth
                    required
                    disabled={currentUser?.role !== 'admin'}
                  >
                    {branches?.map((branch) => (
                      <MenuItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={12} xs={12}>
                  <FormTextField name="description" label="Description" type="text" minRows={5} multiline fullWidth />
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/expenses')}
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
  branches: PropTypes.array.isRequired,
};

export default CreateForm;
