import SvgColor from '@/components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'employee',
    path: '/dashboard/employees',
    icon: icon('ic_user'),
  },
  {
    title: 'branch',
    path: '/dashboard/branches',
    icon: icon('ic_blog'),
  },
  {
    title: 'category',
    path: '/dashboard/categories',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
