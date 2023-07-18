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
import ProductList from '@/pages/product/list';
import ProductCreate from '@/pages/product/create';
import ProductEdit from '@/pages/product/edit';
import ReviewList from '@/pages/review/list';
import ReviewEdit from '@/pages/review/edit';
import CustomerList from '@/pages/customer/list';
import CustomerEdit from '@/pages/customer/edit';
import ExpenseList from '@/pages/expenses/list';
import ExpenseCreate from '@/pages/expenses/create';
import ExpenseEdit from '@/pages/expenses/edit';
import SalaryList from '@/pages/salary/list';
import SalaryCreate from '@/pages/salary/create';
import SalaryEdit from '@/pages/salary/edit';
import OrderList from '@/pages/order/list';
import OrderEdit from '@/pages/order/edit';
import OrderView from '@/pages/order/view';
import RevenueList from '@/pages/revenue/list';
import OrderDetailsPDFView from '@/pages/order/view/OrderDetailsPDF';
import TransactionList from '@/pages/transaction/list';
import TransactionEdit from '@/pages/transaction/edit';
import Profile from '@/pages/profile';
import Settings from '@/pages/settings';
import LoginPage from '@/pages/LoginPage';
import Page404 from '@/pages/Page404';
import { roles } from '@/utils/access-roles';

export default function Router() {
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.dashboard} />}>
        <Route path="app" element={<DashboardAppPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
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
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.product} />}>
        <Route path="product/create" element={<ProductCreate />} />
        <Route path="product/edit/:id" element={<ProductEdit />} />
        <Route path="products" element={<ProductList />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.review} />}>
        <Route path="reviews" element={<ReviewList />} />
        <Route path="review/edit/:id" element={<ReviewEdit />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.customer} />}>
        <Route path="customers" element={<CustomerList />} />
        <Route path="customer/edit/:id" element={<CustomerEdit />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.expense} />}>
        <Route path="expenses" element={<ExpenseList />} />
        <Route path="expense/create" element={<ExpenseCreate />} />
        <Route path="expense/edit/:id" element={<ExpenseEdit />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.salary} />}>
        <Route path="salaries" element={<SalaryList />} />
        <Route path="salary/create" element={<SalaryCreate />} />
        <Route path="salary/edit/:id" element={<SalaryEdit />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.order} />}>
        <Route path="orders" element={<OrderList />} />
        <Route path="order/edit/:id" element={<OrderEdit />} />
        <Route path="order/:id/view" element={<OrderView />} />
        <Route path="order/:id/pdf" element={<OrderDetailsPDFView />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.revenue} />}>
        <Route path="revenues" element={<RevenueList />} />
      </Route>
      <Route path="/dashboard" element={<PrivateOutlet roles={roles.transaction} />}>
        <Route path="transactions" element={<TransactionList />} />
        <Route path="transaction/edit/:id" element={<TransactionEdit />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
