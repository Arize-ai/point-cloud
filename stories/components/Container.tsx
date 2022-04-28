import React from 'react';

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 1000, height: 1000, backgroundColor: '#151616' }}>
      {children}
    </div>
  );
}
