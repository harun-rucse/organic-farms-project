import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Button, MenuItem } from '@mui/material';
import { Form, FormSelectField, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  orderStatus: Yup.string().required().label('Order Status'),
  orderDeliveredBy: Yup.string().label('Order Delivered By'),
});

const orderStatuses = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function EditForm({ handleOnSubmit, order, deleverdPersons, loading }) {
  const navigate = useNavigate();

  return (
    <Form
      initialValues={{
        orderStatus: order?.orderStatus,
        orderDeliveredBy: order?.orderDeliveredBy._id,
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
                  <FormSelectField label="Select order status" name="orderStatus" fullWidth required>
                    {orderStatuses?.map((orderStatus, indx) => (
                      <MenuItem key={indx} value={orderStatus}>
                        {orderStatus}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormSelectField label="Select delevered By" name="orderDeliveredBy" fullWidth required>
                    {deleverdPersons?.map((deleverdPerson) => (
                      <MenuItem key={deleverdPerson._id} value={deleverdPerson._id}>
                        {deleverdPerson?.user?.name}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/orders')}
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
  order: PropTypes.object.isRequired,
  deleverdPersons: PropTypes.array.isRequired,
};

export default EditForm;
