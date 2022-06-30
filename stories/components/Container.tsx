import React from 'react';
import { Toolbar, ToolbarProps } from './Toolbar';

export function Container({
  children,
  showToolbar = true,
  width = 1200,
  height = 800,
  ...toolbarProps
}: ToolbarProps & {
  children: React.ReactNode;
  width?: number;
  height?: number;
  showToolbar: boolean;
}) {
  return (
    <section>
      {showToolbar ? <Toolbar {...toolbarProps} /> : null}
      <div style={{ width, height, backgroundColor: '#151616' }}>
        {children}
      </div>
    </section>
  );
}
