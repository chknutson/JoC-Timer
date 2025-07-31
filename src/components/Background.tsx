import React from 'react';

interface BackgroundProps {
  color?: string;
  children: React.ReactNode;
}

export default function Background({ color = '#9932CC', children }: BackgroundProps) {
  return (
    <div 
      style={{ 
        backgroundColor: color,
        minHeight: '100vh',
        width: '100%'
      }}
    >
      {children}
    </div>
  );
} 