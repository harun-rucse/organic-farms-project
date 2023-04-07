import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Link, Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import Iconify from '../../components/iconify';
import { Form, FormTextField, FormSubmitButton } from '../../components/form';
import { useLoginMutation } from '../../store/apiSlices/authApiSlice';
import { setToken } from '../../store/reducers/authReducer';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required()
    .matches(/^\+8801[3-9]{1}[0-9]{8}$/, 'Phone number is not valid')
    .label('Phone number'),
  password: Yup.string().min(6).required().label('Password'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data));
      navigate('/dashboard', { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (value) => {
    login(value);
  };

  return (
    <Form
      initialValues={{
        phone: '+880',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {isError && (
        <Stack spacing={2} sx={{ mb: 3 }}>
          <Alert severity="error">{error?.data?.message}</Alert>
        </Stack>
      )}

      <Stack spacing={3}>
        <FormTextField name="phone" label="Phone number" type="text" fullWidth required />

        <FormTextField
          name="password"
          label="Password"
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
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" href="/forgot-password">
          Forgot password?
        </Link>
      </Stack>

      <FormSubmitButton loading={isLoading} label="Login in" size="large" color="primary" />
    </Form>
  );
}
