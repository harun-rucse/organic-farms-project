import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import SimpleLayout from '../layouts/simple';
import EmployeeList from '../pages/employee/list';
import EmployeeCreate from '../pages/employee/create';
import Page404 from '../pages/Page404';
import DashboardAppPage from '../pages/DashboardAppPage';
import LoginPage from '../pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        {
          path: 'app',
          element: (
            <PrivateRoute>
              <DashboardAppPage />
            </PrivateRoute>
          ),
        },
        { path: 'employee/create', element: <EmployeeCreate /> },
        { path: 'employee', element: <EmployeeList /> },
      ],
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
