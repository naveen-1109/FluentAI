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
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          disabled={disabled}
          className={`w-full bg-white border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-600 ${
            icon ? 'pl-10' : ''
          } ${error ? 'border-rose-400 focus:border-rose-600' : 'border-slate-300'} ${
            disabled ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
};

