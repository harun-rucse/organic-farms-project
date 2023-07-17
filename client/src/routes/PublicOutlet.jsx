import { Outlet, Navigate } from "react-router-dom";
import { useGetProfileQuery } from "@/store/apiSlices/authApiSlice";

function PublicOutlet() {
  const { data: currentUser, isLoading } = useGetProfileQuery();
  if (isLoading) return;

  if (currentUser) return <Navigate to="/" />;

  return <Outlet />;
}

export default PublicOutlet;
