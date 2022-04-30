import React from 'react';

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 800, height: 500, backgroundColor: '#151616' }}>
      {children}
    </div>
  );
}
