import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Button, Typography } from '@mui/material';
import Iconify from './iconify';

function PageToolbar({ title, buttonLabel, handleOnClick }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOnClick}>
        {buttonLabel}
      </Button>
    </Stack>
  );
}

PageToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};

export default PageToolbar;
