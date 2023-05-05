import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Button, MenuItem, Box, Avatar, TextField } from '@mui/material';
import { Form, FormTextField, FormSelectField, FormSubmitButton } from '@/components/form';

const validationSchema = Yup.object().shape({
  month: Yup.string().required().label('Month'),
  year: Yup.string()
    .required()
    .matches(/202[3-9]{1}|20[3-9]{1}[0-9]{1}|21[0-9]{2}$/, 'Year must be between 2023 to 2199')
    .length(4)
    .label('Year'),
  employee: Yup.string().required().label('Employee'),
  paymentMethod: Yup.string().required().label('Payment Method'),
  status: Yup.string().required().label('Status'),
  branchOffice: Yup.string().label('Branch Office'),
});

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function CreateForm({ handleOnSubmit, branches, employees, loading, setQuery }) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  const showEmployeeSalary = (value) => {
    const employee = employees?.find((employee) => employee._id === value);
    if (employee) {
      setAmount(employee?.salary);
    }
  };

  return (
    <Form
      initialValues={{
        month: '',
        year: '',
        employee: '',
        paymentMethod: '',
        status: '',
        branchOffice: '',
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
                  <FormSelectField label="Select month" name="month" fullWidth required>
                    {months?.map((month, indx) => (
                      <MenuItem key={indx} value={month}>
                        {month}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormTextField name="year" label="Year" type="number" fullWidth />
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField
                    label="Select branch"
                    name="branchOffice"
                    fullWidth
                    setState={(branch) => {
                      setQuery(`branch=${branch}`);
                    }}
                  >
                    {branches?.map((branch) => (
                      <MenuItem key={branch._id} value={branch._id}>
                        {branch.name}
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <FormSelectField
                    label="Select employee"
                    name="employee"
                    fullWidth
                    required
                    setState={showEmployeeSalary}
                  >
                    {employees?.map((employee) => (
                      <MenuItem key={employee._id} value={employee._id}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}
                        >
                          <Avatar src={employee?.user?.image} sx={{ width: 24, height: 24, marginRight: 1 }} />
                          {employee?.user?.name}
                          <Box>
                            {`(${employee?.user?.phone.slice(3, 6)}`}***{`${employee?.user?.phone.slice(-3)})`}
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </FormSelectField>
                </Grid>

                <Grid item md={4} xs={12}>
                  <TextField
                    label="Salary Amount"
                    type="number"
                    value={amount}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    disabled
                  />
                </Grid>

                <Grid item md={4} xs={12}>
                  <FormSelectField label="Select payment method" name="paymentMethod" fullWidth required>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Bank">Bank</MenuItem>
                  </FormSelectField>
                </Grid>

                <Grid item md={4} xs={12}>
                  <FormSelectField label="Select status" name="status" fullWidth required>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                  </FormSelectField>
                </Grid>

                <Grid item pt={2} marginLeft="auto">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate('/dashboard/salaries')}
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
  employees: PropTypes.array.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default CreateForm;
