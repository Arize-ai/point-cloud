import React from 'react';
import { Toolbar, ToolbarProps } from './Toolbar';

export function Container({
  children,
  showToolbar = true,
  ...toolbarProps
}: ToolbarProps & {
  children: React.ReactNode;
  showToolbar: boolean;
}) {
  return (
    <section>
      {showToolbar ? <Toolbar {...toolbarProps} /> : null}
      <div style={{ width: 1200, height: 800, backgroundColor: '#151616' }}>
        {children}
      </div>
    </section>
  );
}
