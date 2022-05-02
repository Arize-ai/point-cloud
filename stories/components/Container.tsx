import React from 'react';

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 1200, height: 800, backgroundColor: '#151616' }}>
      {children}
    </div>
  );
}
