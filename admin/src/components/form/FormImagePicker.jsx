import React, { useState, useRef } from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { TextField, Box, Avatar } from '@mui/material';

function FormImagePicker({ name, label, ...rest }) {
  const { touched, errors, setFieldValue, values, setFieldTouched } = useFormikContext();
  const [imageUrl, setImageUrl] = useState(values[name] ? values[name] : '');
  const fileInputRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '1px dashed rgba(145, 158, 171, 0.32)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar src={imageUrl} alt="Preview" sx={{ width: 100, height: 100, objectFit: 'contain' }} />
      </Box>

      <TextField
        sx={{
          display: 'none',
        }}
        inputRef={fileInputRef}
        type="file"
        name={name}
        onChange={(e) => {
          handleImageChange(e);
          setFieldValue(name, e.target.files);
        }}
        // value={values[name]}
        {...rest}
      />

      <TextField
        sx={{
          cursor: 'pointer !important',
        }}
        type="button"
        size="small"
        value={label}
        onBlur={() => setFieldTouched(name)}
        onClick={() => fileInputRef.current?.click()}
        error={Boolean(touched[name] && errors[name])}
        helperText={touched[name] && errors[name]}
        {...rest}
      />
    </Box>
  );
}

FormImagePicker.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default FormImagePicker;
