import { useAuth } from '@/hooks/useAuth';
import MainLayout from './MainLayouts';
import UserLayout from './UserLayout';
import { Outlet } from 'react-router-dom';
import { ROLE_ENUM } from '@/constants/index';
import { useEffect } from 'react';
import { useLayoutMode } from '@/hooks/useLayoutMode';

const ALLOWED_MAIN_LAYOUT_ROLES = [
  ROLE_ENUM.ADMIN,
  ROLE_ENUM.AGENT,
  ROLE_ENUM.LANDLORD,
  ROLE_ENUM.DEVELOPER,
];

const LayoutSwitcher = () => {
  const { isAuthenticated, user } = useAuth();
  const { layoutMode, setLayoutMode } = useLayoutMode();

  // Initialize layoutMode based on user role on login/auth change
  useEffect(() => {
    if (isAuthenticated && user) {
      if (ALLOWED_MAIN_LAYOUT_ROLES.includes(user.role)) {
        setLayoutMode('main'); // default to main for these roles
      } else {
        setLayoutMode('user');
      }
    } else {
      setLayoutMode('user');
    }
  }, [isAuthenticated, user, setLayoutMode]);

  if (layoutMode === 'main') {
    return (
      <MainLayout>
        <Outlet />
      </MainLayout>
    );
  }

  // user layout mode
  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
};

export default LayoutSwitcher;
