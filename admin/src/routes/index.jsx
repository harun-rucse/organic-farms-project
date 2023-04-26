import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '@/layouts/dashboard';
import SimpleLayout from '@/layouts/simple';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import DashboardAppPage from '@/pages/DashboardAppPage';
import EmployeeList from '@/pages/employee/list';
import EmployeeCreate from '@/pages/employee/create';
import EmployeeEdit from '@/pages/employee/edit';
import BranchList from '@/pages/branch/list';
import BranchCreate from '@/pages/branch/create';
import BranchEdit from '@/pages/branch/edit';
import CategoryList from '@/pages/category/list';
import CategoryCreate from '@/pages/category/create';
import CategoryEdit from '@/pages/category/edit';
import LoginPage from '@/pages/LoginPage';
import Page404 from '@/pages/Page404';

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
        { path: 'employee/edit/:id', element: <EmployeeEdit /> },
        { path: 'employees', element: <EmployeeList /> },
        { path: 'branch/create', element: <BranchCreate /> },
        { path: 'branch/edit/:id', element: <BranchEdit /> },
        { path: 'branches', element: <BranchList /> },
        { path: 'category/create', element: <CategoryCreate /> },
        { path: 'category/edit/:id', element: <CategoryEdit /> },
        { path: 'categories', element: <CategoryList /> },
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
