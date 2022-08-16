import React, { ReactNode } from 'react';

export function ControlPanel({ children }: { children: ReactNode }) {
  return (
    <section
      style={{
        position: 'absolute',
        right: 12,
        top: 48,
        background: '#5c5c5c',
        borderRadius: 8,
        border: '1px solid white',
        padding: 12,
        minWidth: 300,
        color: 'white',
      }}
    >
      {children}
    </section>
  );
}
