import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';
import Iconify from '../../components/iconify';
import { Form, FormTextField, FormSubmitButton } from '../../components/form';

const validationSchema = Yup.object().shape({
  phone: Yup.string().required().min(14).max(14).label('Phone number'),
  password: Yup.string().min(6).required().label('Password'),
});

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (value) => {
    setLoading(true);
    console.log(value);
    navigate('/dashboard', { replace: true });
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

      <FormSubmitButton loading={loading} label="Sing in now" size="large" color="primary" />
    </Form>
  );
}
