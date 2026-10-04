import React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#172B3A] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718496] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          disabled={disabled}
          className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-[#172B3A] placeholder-[#718496] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1769AA]/20 focus:border-[#1769AA] ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-[#C24141] focus:border-[#C24141]' : 'border-[#DCE4EA]'} ${
            disabled ? 'opacity-50 cursor-not-allowed bg-[#F8FAFC]' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-[#C24141] font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-[#718496]">{hint}</p>}
    </div>
  );
};


