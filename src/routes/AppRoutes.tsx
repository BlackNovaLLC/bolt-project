import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContainer } from '../components/auth/AuthContainer';
import { AppLayout } from '../components/layout/AppLayout';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useAuthStore } from '../store/authStore';

export function AppRoutes() {
  const { user, loading, error, initialize } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    initialize().catch(console.error);
  }, [initialize]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#343541] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage 
            message={error} 
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  // Show auth container if not logged in
  if (!user && !location.pathname.startsWith('/auth')) {
    return <AuthContainer />;
  }

  // Redirect to home if logged in and trying to access auth pages
  if (user && location.pathname.startsWith('/auth')) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route path="/:channelId?" element={<AppLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}