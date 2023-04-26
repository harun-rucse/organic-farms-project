import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { Switch, Box, Typography } from '@mui/material';

function FormSwitch({ name, label, ...rest }) {
  const { touched, errors, setFieldValue, values, setFieldTouched } = useFormikContext();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {label}
        </Typography>
        <Switch
          name={name}
          onBlur={() => setFieldTouched(name)}
          onChange={(e) => setFieldValue(name, e.target.checked)}
          value={values[name]}
          checked={values[name]}
          variant="outlined"
          {...rest}
        />
      </Box>
      {touched[name] && errors[name] && (
        <Typography variant="body2" color="error">
          {errors[name]}
        </Typography>
      )}
    </Box>
  );
}

FormSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormSwitch;
