/**
 * D3 Category 10 colors
 */
const Category10 = {
  blue: '#1f77b4',
  orange: '#ff7f0e',
  green: '#2ca02c',
  red: '#d62728',
  purple: '#9467bd',
  brown: '#8c564b',
  magenta: '#e377c2',
  gray: '#7f7f7f',
  lightGreen: '#bcbd22',
  turquoise: '#17becf',
};

/**
 * D3 scale chromatic Rainbow split into 10
 */
const Rainbow10 = {
  Purple: '#6e40aa',
  LightPurple: '#bf3caf',
  Pink: '#fe4b83',
  Orange: '#ff7847',
  LightOrange: '#e2b72f',
  Lime: '#aff05b',
  LightGreen: '#52f667',
  Green: '#1ddfa3',
  LightBlue: '#23abd8',
  Blue: '#4c6edb',
};

/**
 * Colors that should be used to make 2 records discrete
 */
const Discrete2: Record<string, [string, string]> = {
  BlueOrange: [Rainbow10.Blue, Rainbow10.Orange],
  LightBlueOrange: [Rainbow10.LightBlue, Rainbow10.Orange],
  LightBlueLightOrange: [Rainbow10.LightBlue, Rainbow10.LightOrange],
  LimePurple: [Rainbow10.Lime, Rainbow10.Purple],
  LimeLightPurple: [Rainbow10.Lime, Rainbow10.LightPurple],
  BlueLime: [Rainbow10.Blue, Rainbow10.Lime],
};

export const ColorPallettes = {
  Category10,
  Rainbow10,
};

export const ColorSchemes = {
  Discrete2,
};
