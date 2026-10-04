import React from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

interface ProtectedRouteProps {
  currentUser: User | null;
  requireAdmin?: boolean;
  onUnauthorized: () => void;
  children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  currentUser,
  requireAdmin = false,
  onUnauthorized,
  children,
}) => {
  if (!currentUser) {
    onUnauthorized();
    return (
      <div className="glass-panel p-8 text-center space-y-4 my-12">
        <h2 className="text-xl font-bold text-rose-400">Authentication Required</h2>
        <p className="text-xs text-slate-400">Please sign in to access this page.</p>
      </div>
    );
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    return (
      <div className="glass-panel p-8 text-center space-y-4 my-12 border-rose-500/30">
        <h2 className="text-xl font-bold text-rose-400">Access Denied</h2>
        <p className="text-xs text-slate-400">Administrator privileges required to access the control panel.</p>
      </div>
    );
  }

  return <>{children}</>;
};
