import React from 'react';
import type { ReactNode } from 'react';

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return <div className={`px-2 py-2 ${className}`}>{children}</div>;
};
