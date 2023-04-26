import React from 'react';
import { Navigate } from 'react-router-dom';
import useTokenDecode from '@/hooks/useTokenDecode';

function Public({ children }) {
  const currentUser = useTokenDecode();

  return currentUser ? <Navigate to="/dashboard" /> : children;
}

export default Public;
