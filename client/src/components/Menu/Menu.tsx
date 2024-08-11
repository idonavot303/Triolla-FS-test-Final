import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuItem } from '../../types';
import { useMenu } from '../../hooks/useMenu';

const Menu = () => {
  const { menuItems } = useMenu();
  const location = useLocation();

  return (
    <div className='menu'>
      <div className='linksContainer'>
        {menuItems.map((menuItem: MenuItem) => (
          <Link
            key={menuItem.id}
            to={menuItem.path}
            className={location.pathname === menuItem.path ? 'active' : 'link'}
          >
            {menuItem.title}{' '}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
