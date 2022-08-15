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
let Rainbow11: Record<string, string> = {
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
  White: '#ffffff',
};

type Discrete2ColorSchemes =
  | 'PinkLightGreen'
  | 'BlueOrange'
  | 'LightBlueOrange'
  | 'LightBlueLightOrange'
  | 'LimePurple'
  | 'LimeLightPurple'
  | 'BlueLime'
  | 'LightBlueLime'
  | 'WhiteLime'
  | 'WhiteLightBlue'
  | 'WhiteOrange';

/**
 * Colors that should be used to make 2 records discrete
 */
const Discrete2: Record<Discrete2ColorSchemes, [string, string]> = {
  PinkLightGreen: [Rainbow11.Pink, Rainbow11.LightGreen],
  BlueOrange: [Rainbow11.Blue, Rainbow11.Orange],
  LightBlueOrange: [Rainbow11.LightBlue, Rainbow11.Orange],
  LightBlueLightOrange: [Rainbow11.LightBlue, Rainbow11.LightOrange],
  LimePurple: [Rainbow11.Lime, Rainbow11.Purple],
  LimeLightPurple: [Rainbow11.Lime, Rainbow11.LightPurple],
  BlueLime: [Rainbow11.Blue, Rainbow11.Lime],
  LightBlueLime: [Rainbow11.LightBlue, Rainbow11.Lime],
  WhiteLime: [Rainbow11.White, Rainbow11.Lime],
  WhiteLightBlue: [Rainbow11.White, Rainbow11.LightBlue],
  WhiteOrange: [Rainbow11.White, Rainbow11.Orange],
};

export const ColorPallettes = {
  Category10,
  Rainbow11,
};

export const ColorSchemes = {
  Discrete2,
};
