import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Result from './Result';
import PageToolbar from '../../../components/PageToolbar';

export default function List() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title> Organic-farms | Employees </title>
      </Helmet>

      <Container>
        <PageToolbar
          title="Employees"
          buttonLabel="Add new employee"
          handleOnClick={() => navigate('/dashboard/employee/create')}
        />
        <Result />
      </Container>
    </>
  );
}
