import React from 'react';
import { RouterProvider, useRouter } from './router/Router';
import { PublicWebsite } from './pages/PublicWebsite';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { path } = useRouter();

  // Normalize path without trailing slash (unless root)
  const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

  if (normalizedPath === '/admin/login') {
    return <AdminLogin />;
  }

  if (normalizedPath === '/admin' || normalizedPath === '/admin/dashboard') {
    return <AdminDashboard />;
  }

  return <PublicWebsite />;
};

export const App: React.FC = () => {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
};

export default App;
