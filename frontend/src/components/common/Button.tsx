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
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#1769AA]/30';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-xs sm:text-sm gap-2',
    lg: 'px-5 py-3 text-sm sm:text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-[#1769AA] hover:bg-[#0E4F7A] text-white shadow-xs active:bg-[#0A3D60]',
    secondary: 'bg-[#0F766E] hover:bg-[#0D635D] text-white shadow-xs active:bg-[#094A46]',
    outline: 'bg-white hover:bg-[#F8FAFC] text-[#172B3A] border border-[#DCE4EA] shadow-xs active:bg-[#EAF3F9]',
    ghost: 'bg-transparent hover:bg-[#EAF3F9] text-[#52687A] hover:text-[#172B3A]',
    danger: 'bg-[#C24141] hover:bg-[#A83434] text-white shadow-xs active:bg-[#8E2828]',
    amber: 'bg-[#A66A16] hover:bg-[#8D5810] text-white shadow-xs active:bg-[#74470A]',
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


