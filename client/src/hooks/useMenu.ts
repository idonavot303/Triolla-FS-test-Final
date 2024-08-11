import { MenuItem } from '../ts/typs';

export const useMenu = () => {
  const menuItems: MenuItem[] = [
    {
      id: 0,
      title: 'Dashboard',
      path: '/',
    },
    {
      id: 1,
      title: 'Events',
      path: '/events',
    },
  ];
  return {
    menuItems,
  };
};
