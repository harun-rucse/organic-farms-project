import React from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';

function FormSubmitButton({ label, color, ...rest }) {
  const { handleSubmit } = useFormikContext();

  return (
    <LoadingButton color={color} variant="contained" onClick={handleSubmit} {...rest}>
      {label}
    </LoadingButton>
  );
}

FormSubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
};

FormSubmitButton.defaultProps = {
  color: 'primary',
};

export default FormSubmitButton;
