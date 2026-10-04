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
  glow = 'none',
  interactive = false,
}) => {
  const glowStyles = {
    none: '',
    blue: 'glow-blue border-sky-500/20',
    gold: 'glow-gold border-amber-500/20',
    indigo: 'glow-indigo border-indigo-500/20',
  };

  const panelClass = interactive ? 'glass-panel-interactive' : 'glass-panel';

  return (
    <div className={`${panelClass} p-6 ${glowStyles[glow]} ${className}`}>
      {children}
    </div>
  );
};
