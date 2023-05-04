import React from 'react';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Button, MenuItem } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormDatePicker, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  category: Yup.string().required().label('Category'),
  amount: Yup.number().min(1).required().label('Amount'),
  description: Yup.string().required().label('Description'),
  date: Yup.date().required().label('Date'),
});

const categories = ['Operations', 'Marketing', 'Rent', 'Transport', 'Utility', 'Other'];

function EditForm({ handleOnSubmit, expense, loading }) {
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        category: expense?.category,
        amount: expense?.amount,
        description: expense?.description,
        date: dayjs(expense?.date),
      }}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      <Grid container spacing={6}>
        <Grid item lg={12} md={12} xs={12}>
          <Card>
            <CardContent>
              <Grid container columnSpacing={4}>
                <Grid item md={4} xs={12}>
                  <FormSelectField label="Select expense category" name="category" fullWidth required>
                    {categories?.map((category, indx) => (
                      <MenuItem key={indx} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={4} xs={12}>
                  <FormTextField name="amount" label="Amount" type="number" fullWidth />
                </Grid>

                <Grid item md={4} xs={12}>
                  <FormDatePicker name="date" label="Choose Date" fullWidth disableFuture />
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
  loading: PropTypes.bool.isRequired,
  expense: PropTypes.object.isRequired,
};

export default EditForm;
