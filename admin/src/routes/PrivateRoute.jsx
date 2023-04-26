import React from 'react';
import { Navigate } from 'react-router-dom';
import useTokenDecode from '@/hooks/useTokenDecode';

function Private({ children }) {
  const currentUser = useTokenDecode();

  return currentUser ? children : <Navigate to="/login" />;
}

export default Private;
