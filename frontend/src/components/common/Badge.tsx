import React from 'react';
import type { ReactNode } from 'react';

export interface BadgeProps {
  variant?: 'sky' | 'amber' | 'emerald' | 'indigo' | 'rose' | 'slate' | 'teal';
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
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantStyles = {
    sky: 'bg-sky-50 text-sky-800 border border-sky-200/80',
    teal: 'bg-teal-50 text-teal-800 border border-teal-200/80',
    amber: 'bg-amber-50 text-amber-800 border border-amber-200/80',
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    indigo: 'bg-slate-100 text-slate-800 border border-slate-200',
    rose: 'bg-rose-50 text-rose-800 border border-rose-200/80',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-md ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

