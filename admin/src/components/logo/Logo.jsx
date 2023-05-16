import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = <Box component="img" src="/logo.svg" sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }} />;

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
      {logo}
      <Typography variant="p" sx={{ fontWeight: 'medium', color: '#008C27' }}>
        Organic Farms
      </Typography>
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
