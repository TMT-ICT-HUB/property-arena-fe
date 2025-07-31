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
import EditPropertyPage from '@/pages/EditProperty';
import PropertyDetailPage from '@/pages/PropertyDetail';
import LayoutSwitcher from '@/layouts/LayoutSwitcher';
import Profile from '@/pages/profile/Profile';
import EditProfile from '@/pages/profile/EditProfile';

// const withMainLayout = (
//   <MainLayout>
//     <Outlet />
//   </MainLayout>
// );

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
    element: <LayoutSwitcher />,
    children: [
      {
        path: '/',
        element: <PropertyList />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
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
        path: '/profile/',
        element: (
          <ProtectedRoute fallback={<div>Loading…</div>}>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/edit-profile/',
        element: (
          <ProtectedRoute fallback={<div>Loading…</div>}>
            <EditProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/properties/:propertyId",
        element: (
          // <ProtectedRoute fallback={<div>Loading…</div>}>
          // </ProtectedRoute>
            <PropertyDetailPage />
        ),
      },
      {
        path: "/properties/:propertyId/edit",
        element: (
          <ProtectedRoute fallback={<div>Loading…</div>}>
            <EditPropertyPage />
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