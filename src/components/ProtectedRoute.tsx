// src/components/ProtectedRoute.tsx
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;      // allow any node, and make it optional
  fallback?: React.ReactNode;      // optional UI to render while checking auth
}

export function ProtectedRoute({
  children,
  fallback = null,
}: ProtectedRouteProps): JSX.Element {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <>{fallback}</>;         // e.g. a spinner or null
  }

  return isAuthenticated
    ? <>{children}</>               // render whatever was passed
    : <Navigate to="/login" replace />;
}
