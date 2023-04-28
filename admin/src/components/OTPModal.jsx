import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Alert,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: '450px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function OTPModal({ title, message, open, handleClose, handleClick, isSending }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // handleDigitChange function to update digits state whenever user inputs a digit
  const handleDigitChange = (index) => (event) => {
    const { value } = event.target;
    setDigits((prevState) => {
      const newState = [...prevState];
      newState[index] = value;
      return newState;
    });

    if (value !== '') {
      // move focus to next input field
      inputRefs[index + 1]?.current?.focus();
    }
  };

  // handleSubmit function to submit OTP when all digits are entered
  const handleSubmit = () => {
    const otp = digits.join('');
    handleClick(otp);
  };

  const handleModalClose = () => {
    setDigits(['', '', '', '']);
    handleClose();
  };

  return (
    <div>
      <BootstrapDialog onClose={handleModalClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleModalClose}>
          {title}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Alert severity={message?.variant}>{message?.text}</Alert>
          <Box sx={{ width: '80%', display: 'flex', justifyContent: 'center', mt: 2, mx: 'auto' }}>
            {digits.map((digit, index) => (
              <TextField
                key={index}
                inputRef={inputRefs[index]}
                value={digit}
                onChange={handleDigitChange(index)}
                variant="outlined"
                type="number"
                style={{ marginRight: 12 }}
                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" color="primary" onClick={handleModalClose}>
            Cancel
          </Button>
          <LoadingButton
            autoFocus
            variant="contained"
            color="error"
            loading={isSending}
            onClick={handleSubmit}
            disabled={digits.includes('')}
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

OTPModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
};

export default OTPModal;
