import SvgColor from '@/components/svg-color';
import { roles } from '@/utils/access-roles';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
    roles: roles.dashboard,
  },
  {
    title: 'branch',
    path: '/dashboard/branches',
    icon: icon('ic_branch'),
    roles: roles.branch,
  },
  {
    title: 'employee',
    path: '/dashboard/employees',
    icon: icon('ic_employee'),
    roles: roles.employee,
  },
  {
    title: 'customers',
    path: '/dashboard/customers',
    icon: icon('ic_customer'),
    roles: roles.customer,
  },
  {
    title: 'farmers',
    path: '/dashboard/farmers',
    icon: icon('ic_farmer'),
    roles: roles.farmer,
  },
  {
    title: 'farmer card',
    path: '/dashboard/farmer-cards',
    icon: icon('ic_idcard'),
    roles: roles.farmerCard,
  },
  {
    title: 'category',
    path: '/dashboard/categories',
    icon: icon('ic_category'),
    roles: roles.category,
  },
  {
    title: 'subcategory',
    path: '/dashboard/sub-categories',
    icon: icon('ic_subcategory'),
    roles: roles.subCategory,
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_product'),
    roles: roles.product,
  },
  {
    title: 'reviews',
    path: '/dashboard/reviews',
    icon: icon('ic_review'),
    roles: roles.review,
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: icon('ic_order'),
    roles: roles.order,
  },
  {
    title: 'expenses',
    path: '/dashboard/expenses',
    icon: icon('ic_cost'),
    roles: roles.expense,
  },
  {
    title: 'revenues',
    path: '/dashboard/revenues',
    icon: icon('ic_revenue'),
    roles: roles.revenue,
  },
  {
    title: 'salaries',
    path: '/dashboard/salaries',
    icon: icon('ic_salary'),
    roles: roles.salary,
  },
  {
    title: 'transactions',
    path: '/dashboard/transactions',
    icon: icon('ic_transaction'),
    roles: roles.transaction,
  },
  {
    title: 'settings',
    path: '/dashboard/settings',
    icon: icon('ic_settings'),
    roles: roles.dashboard,
  },
];

export default navConfig;
