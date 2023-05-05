import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

function FormSelectField({ name, label, children, setState, ...rest }) {
  const { touched, errors, setFieldValue, values, setFieldTouched } = useFormikContext();

  return (
    <TextField
      select
      name={name}
      label={label}
      margin="normal"
      onBlur={() => setFieldTouched(name)}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
        setState(e.target.value);
      }}
      value={values[name]}
      variant="outlined"
      error={Boolean(touched[name] && errors[name])}
      helperText={touched[name] && errors[name]}
      {...rest}
    >
      {children}
    </TextField>
  );
}

FormSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  setState: PropTypes.func,
};

FormSelectField.defaultProps = {
  setState: () => {},
};

export default FormSelectField;
