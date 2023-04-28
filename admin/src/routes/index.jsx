import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateOutlet from './PrivateOutlet';
import PublicOutlet from './PublicOutlet';
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
import SubCategoryList from '@/pages/sub-category/list';
import SubCategoryCreate from '@/pages/sub-category/create';
import SubCategoryEdit from '@/pages/sub-category/edit';
import FarmerList from '@/pages/farmer/list';
import FarmerCreate from '@/pages/farmer/create';
import FarmerEdit from '@/pages/farmer/edit';
import FarmerCardList from '@/pages/farmer-card/list';
import FarmerCardView from '@/pages/farmer-card/view';
import LoginPage from '@/pages/LoginPage';
import Page404 from '@/pages/Page404';
import { roles } from '@/utils/access-roles';

export default function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.dashboard} />}>
        <Route path="app" element={<DashboardAppPage />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.employee} />}>
        <Route path="employee/create" element={<EmployeeCreate />} />
        <Route path="employee/edit/:id" element={<EmployeeEdit />} />
        <Route path="employees" element={<EmployeeList />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.branch} />}>
        <Route path="branch/create" element={<BranchCreate />} />
        <Route path="branch/edit/:id" element={<BranchEdit />} />
        <Route path="branches" element={<BranchList />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.category} />}>
        <Route path="category/create" element={<CategoryCreate />} />
        <Route path="category/edit/:id" element={<CategoryEdit />} />
        <Route path="categories" element={<CategoryList />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.subCategory} />}>
        <Route path="sub-category/create" element={<SubCategoryCreate />} />
        <Route path="sub-category/edit/:id" element={<SubCategoryEdit />} />
        <Route path="sub-categories" element={<SubCategoryList />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.farmer} />}>
        <Route path="farmer/create" element={<FarmerCreate />} />
        <Route path="farmer/edit/:id" element={<FarmerEdit />} />
        <Route path="farmers" element={<FarmerList />} />
      </Route>
      <Route path="/" element={<PublicOutlet />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard/app" />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.farmerCard} />}>
        <Route path="farmer-card/view/:id" element={<FarmerCardView />} />
        <Route path="farmer-cards" element={<FarmerCardList />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
