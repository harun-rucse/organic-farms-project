import { Helmet } from 'react-helmet-async';
import { Container, Stack, Button, Typography } from '@mui/material';
import EmployeeForm from './EmployeeForm';

function EmployeeCreate() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Helmet>
        <title> Organic-farms | Create new employee </title>
      </Helmet>

      <Container>
        <Stack mb={4}>
          <Typography variant="h4" gutterBottom>
            Create a new employee
          </Typography>
        </Stack>
        <EmployeeForm handleOnSubmit={handleSubmit} />
      </Container>
    </>
  );
}

export default EmployeeCreate;
