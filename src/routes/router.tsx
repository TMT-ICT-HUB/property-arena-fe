// src/routes/router.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import HomePage from '../pages/Homepage';
import LoginPage from '../pages/Login';
// import DashboardLayout from '../layouts/DashboardLayout';
import NotFound from '../pages/Notfound';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import SignUp from '@/pages/Signup';
import MainLayout from '@/layouts/MainLayouts';
import CreateProperty from '@/pages/create-property/CreateProperty';
import PropertyList from '@/pages/list-property/ListProperty';
import ListUserProperty from '@/pages/list-property/ListUserProperty';

const withMainLayout = (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

export const router = createBrowserRouter([

  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <NotFound />,
  },

  // Main layout routes
  {
    element: withMainLayout,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/dashboard',
        element: <PropertyList />,
      },
      {
        path: '/create-property',
        element: (
          <ProtectedRoute fallback={<div>Loading…</div>}>
            <CreateProperty />
          </ProtectedRoute>
        ),
      },
      {
        path: '/my-listing',
        element: (
          <ProtectedRoute fallback={<div>Loading…</div>}>
            <ListUserProperty />
          </ProtectedRoute>
        ),
      },
      {
        path: '/secret',
        element: (
          <ProtectedRoute fallback={<div>Loading…</div>}>
            <div>Secret Content</div> {/* Replace with your actual page */}
          </ProtectedRoute>
        ),
      },
      // Add more protected or public routes under MainLayout here
    ],
  },
]);