import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Button, MenuItem, TextField } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  trxId: Yup.string().required().label('Trx ID'),
  paymentStatus: Yup.string().required().label('Payment status'),
});

const statuses = ['Paid', 'Unpaid'];

function EditForm({ handleOnSubmit, transaction, loading }) {
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        trxId: transaction?.trxId,
        paymentStatus: transaction?.paymentStatus,
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
                  <TextField
                    label="Payment Type"
                    type="text"
                    margin="normal"
                    value={transaction?.farmer?.receivePayment?.type}
                    fullWidth
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    label="Payment number"
                    type="text"
                    margin="normal"
                    value={transaction?.farmer?.receivePayment?.number}
                    fullWidth
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <TextField
                    label="Total Amount"
                    type="text"
                    margin="normal"
                    value={transaction?.payableAmount}
                    fullWidth
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormTextField name="trxId" label="Trx ID" type="text" fullWidth required />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField label="Select payment status" name="paymentStatus" fullWidth required>
                    {statuses?.map((status, indx) => (
                      <MenuItem key={indx} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/transactions')}
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
  transaction: PropTypes.object.isRequired,
};

export default EditForm;
