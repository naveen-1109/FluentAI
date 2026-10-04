import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'amber';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sky-500/30';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-3 text-sm sm:text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-sky-700 hover:bg-sky-800 text-white shadow-xs active:bg-sky-900',
    secondary: 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs active:bg-teal-900',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs active:bg-slate-100',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
    danger: 'bg-rose-700 hover:bg-rose-800 text-white shadow-xs active:bg-rose-900',
    amber: 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs active:bg-amber-800',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};

