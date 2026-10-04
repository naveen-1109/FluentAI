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
    sky: 'bg-[#EAF3F9] text-[#1769AA] border border-[#1769AA]/30',
    teal: 'bg-[#E7F5F2] text-[#0F766E] border border-[#0F766E]/30',
    amber: 'bg-[#FFF7E6] text-[#A66A16] border border-[#A66A16]/30',
    emerald: 'bg-[#EAF6F1] text-[#167A5B] border border-[#167A5B]/30',
    indigo: 'bg-[#EAF3F9] text-[#123B5D] border border-[#123B5D]/30',
    rose: 'bg-[#FDEEEE] text-[#C24141] border border-[#C24141]/30',
    slate: 'bg-[#F8FAFC] text-[#52687A] border border-[#DCE4EA]',
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


