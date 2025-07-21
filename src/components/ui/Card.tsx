import React from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 p-4 shadow-md ${className} bg-gradient-to-r from-purple-100 to-purple-200`}
    >
      {children}
    </div>
  );
};
