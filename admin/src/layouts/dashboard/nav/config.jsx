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
    icon: icon('ic_blog'),
    roles: roles.branch,
  },
  {
    title: 'employee',
    path: '/dashboard/employees',
    icon: icon('ic_user'),
    roles: roles.employee,
  },
  {
    title: 'customers',
    path: '/dashboard/customers',
    icon: icon('ic_user'),
    roles: roles.customer,
  },
  {
    title: 'farmers',
    path: '/dashboard/farmers',
    icon: icon('ic_user'),
    roles: roles.farmer,
  },
  {
    title: 'farmer card',
    path: '/dashboard/farmer-cards',
    icon: icon('ic_user'),
    roles: roles.farmerCard,
  },
  {
    title: 'category',
    path: '/dashboard/categories',
    icon: icon('ic_lock'),
    roles: roles.category,
  },
  {
    title: 'subcategory',
    path: '/dashboard/sub-categories',
    icon: icon('ic_lock'),
    roles: roles.subCategory,
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_lock'),
    roles: roles.farmerCard,
  },
  {
    title: 'reviews',
    path: '/dashboard/reviews',
    icon: icon('ic_lock'),
    roles: roles.review,
  },
];

export default navConfig;
