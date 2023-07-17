import { Outlet, Navigate } from "react-router-dom";
import { useGetProfileQuery } from "@/store/apiSlices/authApiSlice";

function PrivateOutlet() {
  const { data: currentUser, isLoading } = useGetProfileQuery();
  if (isLoading) return;

  if (!currentUser) return <Navigate to="/login" />;

  return <Outlet />;
}

export default PrivateOutlet;
