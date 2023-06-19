import { createPortal } from 'react-dom';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const Loader = ({ isLoading }) => {
  if (!isLoading) {
    return null;
  }

  const spin = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  return createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        bgcolor: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          height: '120px',
          width: '120px',
          borderTopWidth: '5px',
          borderBottomWidth: '5px',
          borderColor: 'grey.500',
          borderRadius: '50%',
          borderStyle: 'outset',
          animation: `${spin} 1s linear infinite`,
        }}
      ></Box>
    </Box>,
    document.getElementById('loader-root')
  );
};

export default Loader;
