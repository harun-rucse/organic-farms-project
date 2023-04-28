import { Outlet, Navigate } from 'react-router-dom';
import { useGetProfileQuery } from '@/store/apiSlices/authApiSlice';

function PrivateOutlet({ roles = [] }) {
  const { data: currentUser, isLoading } = useGetProfileQuery();
  if (isLoading) return;

  if (!currentUser) return <Navigate to="/login" />;

  if (roles.length && !roles.includes(currentUser.role)) return <Navigate to="/404" />;

  return <Outlet />;
}

export default PrivateOutlet;
