import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Typography } from '@mui/material';

function FormDatePicker({ name, label, format, ...rest }) {
  const { touched, errors, setFieldValue, values, setFieldTouched } = useFormikContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <Box sx={{ width: '100%', pt: 1.2 }}>
          <DatePicker
            sx={{ width: '100%' }}
            name={name}
            label={label}
            value={values[name]}
            onChange={(val) => setFieldValue(name, val)}
            onBlur={() => setFieldTouched(name)}
            error={Boolean(touched[name] && errors[name])}
            format={format}
            {...rest}
          />
          {touched[name] && errors[name] && (
            <Typography variant="caption" color="red" px={2}>
              {errors[name]}
            </Typography>
          )}
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}

FormDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

FormDatePicker.defaultProps = {
  format: 'DD/MM/YYYY',
};

export default FormDatePicker;
