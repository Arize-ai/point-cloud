import React, { useEffect, useRef } from 'react';
import { Color } from 'three';

export const Axes = ({
  size,
  color = '#ffffff',
}: {
  /**
   * The size of the axes helper
   */
  size: number;
  /**
   * The color of the axes helper
   * @default '#ffffff'
   */
  color?: string;
}) => {
  const ref = useRef<THREE.AxesHelper>(null);
  useEffect(() => {
    if (ref.current) {
      const colorObj = new Color(color);
      ref.current.setColors(colorObj, colorObj, colorObj);
    }
  }, [color]);
  return <axesHelper ref={ref} args={[size]} />;
};
