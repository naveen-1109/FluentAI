import React from 'react';
import type { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: 'blue' | 'gold' | 'indigo' | 'none';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  interactive = false,
}) => {
  const panelClass = interactive ? 'clinical-card-interactive' : 'clinical-card';

  return (
    <div className={`${panelClass} p-6 ${className}`}>
      {children}
    </div>
  );
};

