import React from 'react';
import type { ReactNode } from 'react';

export interface BadgeProps {
  variant?: 'sky' | 'amber' | 'emerald' | 'indigo' | 'rose' | 'slate';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'sky',
  size = 'md',
  icon,
  children,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantStyles = {
    sky: 'bg-sky-500/10 text-sky-400 border border-sky-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
    slate: 'bg-slate-800 text-slate-300 border border-slate-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-lg ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
