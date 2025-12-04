export interface ThemeVariables {
  // Colors
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
  'chart-1': string;
  'chart-2': string;
  'chart-3': string;
  'chart-4': string;
  'chart-5': string;
  sidebar: string;
  'sidebar-foreground': string;
  'sidebar-primary': string;
  'sidebar-primary-foreground': string;
  'sidebar-accent': string;
  'sidebar-accent-foreground': string;
  'sidebar-border': string;
  'sidebar-ring': string;

  // Fonts
  'font-sans': string;
  'font-serif': string;
  'font-mono': string;

  // Layout
  radius: string;

  // Shadows
  'shadow-x': string;
  'shadow-y': string;
  'shadow-blur': string;
  'shadow-spread': string;
  'shadow-opacity': string;
  'shadow-color': string;
  'shadow-2xs': string;
  'shadow-xs': string;
  'shadow-sm': string;
  shadow: string;
  'shadow-md': string;
  'shadow-lg': string;
  'shadow-xl': string;
  'shadow-2xl': string;

  // Typography
  'tracking-normal': string;
  spacing: string;
}

export interface Theme {
  name: string;
  description?: string;
  light: ThemeVariables;
  dark: ThemeVariables;
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'Warm Brown',
    description: 'Project default',
    light: {
      // Colors - HSL values from current index.css
      background: 'hsl(26 30% 86%)',
      foreground: 'hsl(28 28% 16%)',
      card: 'hsl(28 34% 90%)',
      'card-foreground': 'hsl(28 28% 16%)',
      popover: 'hsl(28 34% 90%)',
      'popover-foreground': 'hsl(28 28% 16%)',
      primary: 'hsl(21.43 38.89% 35.29%)',
      'primary-foreground': 'hsl(36 64% 96%)',
      secondary: 'hsl(26 26% 72%)',
      'secondary-foreground': 'hsl(26 34% 22%)',
      muted: 'hsl(24 22% 74%)',
      'muted-foreground': 'hsl(24 20% 36%)',
      accent: 'hsl(26 24% 68%)',
      'accent-foreground': 'hsl(26 34% 22%)',
      destructive: 'hsl(5 65% 48%)',
      'destructive-foreground': 'hsl(0 0% 98%)',
      border: 'hsl(24 22% 64%)',
      input: 'hsl(24 22% 64%)',
      ring: 'hsl(22 46% 34%)',
      'chart-1': 'hsl(22 46% 34%)',
      'chart-2': 'hsl(18 50% 42%)',
      'chart-3': 'hsl(14 52% 44%)',
      'chart-4': 'hsl(10 58% 48%)',
      'chart-5': 'hsl(6 54% 52%)',
      sidebar: 'hsl(24 22% 74%)',
      'sidebar-foreground': 'hsl(28 28% 16%)',
      'sidebar-primary': 'hsl(22 46% 34%)',
      'sidebar-primary-foreground': 'hsl(36 64% 96%)',
      'sidebar-accent': 'hsl(26 24% 68%)',
      'sidebar-accent-foreground': 'hsl(26 34% 22%)',
      'sidebar-border': 'hsl(24 22% 64%)',
      'sidebar-ring': 'hsl(22 46% 34%)',

      // Fonts
      'font-sans': 'Inconsolata, system-ui, Avenir, Helvetica, Arial, sans-serif',
      'font-serif': 'Merriweather, serif',
      'font-mono': 'Source Code Pro, monospace',

      // Layout
      radius: '0.5rem',

      // Shadows
      'shadow-x': '0',
      'shadow-y': '1px',
      'shadow-blur': '3px',
      'shadow-spread': '0px',
      'shadow-opacity': '0.1',
      'shadow-color': 'hsl(0 0% 0%)',
      'shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      'shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      'shadow-sm': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      shadow: '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      'shadow-md': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
      'shadow-lg': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
      'shadow-xl': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
      'shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',

      // Typography
      'tracking-normal': '0rem',
      spacing: '0.25rem',
    },
    dark: {
      // Colors - HSL values from current index.css
      background: 'hsl(24 25% 10%)',
      foreground: 'hsl(36 42% 94%)',
      card: 'hsl(24 22% 12%)',
      'card-foreground': 'hsl(36 42% 94%)',
      popover: 'hsl(24 22% 12%)',
      'popover-foreground': 'hsl(36 42% 94%)',
      primary: 'hsl(28 45% 52%)',
      'primary-foreground': 'hsl(36 64% 96%)',
      secondary: 'hsl(24 18% 20%)',
      'secondary-foreground': 'hsl(36 42% 94%)',
      muted: 'hsl(24 16% 24%)',
      'muted-foreground': 'hsl(28 24% 70%)',
      accent: 'hsl(26 24% 28%)',
      'accent-foreground': 'hsl(36 42% 94%)',
      destructive: 'hsl(5 65% 48%)',
      'destructive-foreground': 'hsl(0 0% 98%)',
      border: 'hsl(24 18% 28%)',
      input: 'hsl(24 18% 28%)',
      ring: 'hsl(28 45% 52%)',
      'chart-1': 'hsl(28 45% 52%)',
      'chart-2': 'hsl(22 52% 58%)',
      'chart-3': 'hsl(16 50% 60%)',
      'chart-4': 'hsl(12 55% 62%)',
      'chart-5': 'hsl(8 58% 65%)',
      sidebar: 'hsl(24 25% 10%)',
      'sidebar-foreground': 'hsl(36 42% 94%)',
      'sidebar-primary': 'hsl(28 45% 52%)',
      'sidebar-primary-foreground': 'hsl(36 64% 96%)',
      'sidebar-accent': 'hsl(26 24% 28%)',
      'sidebar-accent-foreground': 'hsl(36 42% 94%)',
      'sidebar-border': 'hsl(24 18% 28%)',
      'sidebar-ring': 'hsl(28 45% 52%)',

      // Fonts
      'font-sans': 'Inconsolata, system-ui, Avenir, Helvetica, Arial, sans-serif',
      'font-serif': 'Merriweather, serif',
      'font-mono': 'Source Code Pro, monospace',

      // Layout
      radius: '0.5rem',

      // Shadows
      'shadow-x': '0',
      'shadow-y': '1px',
      'shadow-blur': '3px',
      'shadow-spread': '0px',
      'shadow-opacity': '0.1',
      'shadow-color': 'hsl(0 0% 0%)',
      'shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      'shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      'shadow-sm': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      shadow: '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      'shadow-md': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
      'shadow-lg': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
      'shadow-xl': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
      'shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',

      // Typography
      'tracking-normal': '0rem',
      spacing: '0.25rem',
    },
  },
  theme2: {
    name: 'Nature',
    description: 'from Tweakcn',
    light: {
      // Colors - OKLCH values from user's example
      background: 'oklch(0.9711 0.0074 80.7211)',
      foreground: 'oklch(0.3000 0.0358 30.2042)',
      card: 'oklch(0.9711 0.0074 80.7211)',
      'card-foreground': 'oklch(0.3000 0.0358 30.2042)',
      popover: 'oklch(0.9711 0.0074 80.7211)',
      'popover-foreground': 'oklch(0.3000 0.0358 30.2042)',
      primary: 'oklch(0.5234 0.1347 144.1672)',
      'primary-foreground': 'oklch(1.0000 0 0)',
      secondary: 'oklch(0.9571 0.0210 147.6360)',
      'secondary-foreground': 'oklch(0.4254 0.1159 144.3078)',
      muted: 'oklch(0.9370 0.0142 74.4218)',
      'muted-foreground': 'oklch(0.4495 0.0486 39.2110)',
      accent: 'oklch(0.8952 0.0504 146.0366)',
      'accent-foreground': 'oklch(0.4254 0.1159 144.3078)',
      destructive: 'oklch(0.5386 0.1937 26.7249)',
      'destructive-foreground': 'oklch(1.0000 0 0)',
      border: 'oklch(0.8805 0.0208 74.6428)',
      input: 'oklch(0.8805 0.0208 74.6428)',
      ring: 'oklch(0.5234 0.1347 144.1672)',
      'chart-1': 'oklch(0.6731 0.1624 144.2083)',
      'chart-2': 'oklch(0.5752 0.1446 144.1813)',
      'chart-3': 'oklch(0.5234 0.1347 144.1672)',
      'chart-4': 'oklch(0.4254 0.1159 144.3078)',
      'chart-5': 'oklch(0.2157 0.0453 145.7256)',
      sidebar: 'oklch(0.9370 0.0142 74.4218)',
      'sidebar-foreground': 'oklch(0.3000 0.0358 30.2042)',
      'sidebar-primary': 'oklch(0.5234 0.1347 144.1672)',
      'sidebar-primary-foreground': 'oklch(1.0000 0 0)',
      'sidebar-accent': 'oklch(0.8952 0.0504 146.0366)',
      'sidebar-accent-foreground': 'oklch(0.4254 0.1159 144.3078)',
      'sidebar-border': 'oklch(0.8805 0.0208 74.6428)',
      'sidebar-ring': 'oklch(0.5234 0.1347 144.1672)',

      // Fonts
      'font-sans': 'Montserrat, sans-serif',
      'font-serif': 'Merriweather, serif',
      'font-mono': 'Source Code Pro, monospace',

      // Layout
      radius: '0.5rem',

      // Shadows
      'shadow-x': '0',
      'shadow-y': '1px',
      'shadow-blur': '3px',
      'shadow-spread': '0px',
      'shadow-opacity': '0.1',
      'shadow-color': 'oklch(0 0 0)',
      'shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      'shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      'shadow-sm': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      shadow: '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      'shadow-md': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
      'shadow-lg': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
      'shadow-xl': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
      'shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',

      // Typography
      'tracking-normal': '0em',
      spacing: '0.25rem',
    },
    dark: {
      // Colors - OKLCH values from user's example
      background: 'oklch(0.2683 0.0279 150.7681)',
      foreground: 'oklch(0.9423 0.0097 72.6595)',
      card: 'oklch(0.3327 0.0271 146.9867)',
      'card-foreground': 'oklch(0.9423 0.0097 72.6595)',
      popover: 'oklch(0.3327 0.0271 146.9867)',
      'popover-foreground': 'oklch(0.9423 0.0097 72.6595)',
      primary: 'oklch(0.6731 0.1624 144.2083)',
      'primary-foreground': 'oklch(0.2157 0.0453 145.7256)',
      secondary: 'oklch(0.3942 0.0265 142.9926)',
      'secondary-foreground': 'oklch(0.8970 0.0166 142.5518)',
      muted: 'oklch(0.2926 0.0212 147.7496)',
      'muted-foreground': 'oklch(0.8579 0.0174 76.0955)',
      accent: 'oklch(0.5752 0.1446 144.1813)',
      'accent-foreground': 'oklch(0.9423 0.0097 72.6595)',
      destructive: 'oklch(0.5386 0.1937 26.7249)',
      'destructive-foreground': 'oklch(0.9423 0.0097 72.6595)',
      border: 'oklch(0.3942 0.0265 142.9926)',
      input: 'oklch(0.3942 0.0265 142.9926)',
      ring: 'oklch(0.6731 0.1624 144.2083)',
      'chart-1': 'oklch(0.7660 0.1179 145.2950)',
      'chart-2': 'oklch(0.7185 0.1417 144.8887)',
      'chart-3': 'oklch(0.6731 0.1624 144.2083)',
      'chart-4': 'oklch(0.6291 0.1543 144.2031)',
      'chart-5': 'oklch(0.5752 0.1446 144.1813)',
      sidebar: 'oklch(0.2683 0.0279 150.7681)',
      'sidebar-foreground': 'oklch(0.9423 0.0097 72.6595)',
      'sidebar-primary': 'oklch(0.6731 0.1624 144.2083)',
      'sidebar-primary-foreground': 'oklch(0.2157 0.0453 145.7256)',
      'sidebar-accent': 'oklch(0.5752 0.1446 144.1813)',
      'sidebar-accent-foreground': 'oklch(0.9423 0.0097 72.6595)',
      'sidebar-border': 'oklch(0.3942 0.0265 142.9926)',
      'sidebar-ring': 'oklch(0.6731 0.1624 144.2083)',

      // Fonts
      'font-sans': 'Montserrat, sans-serif',
      'font-serif': 'Merriweather, serif',
      'font-mono': 'Source Code Pro, monospace',

      // Layout
      radius: '0.5rem',

      // Shadows
      'shadow-x': '0',
      'shadow-y': '1px',
      'shadow-blur': '3px',
      'shadow-spread': '0px',
      'shadow-opacity': '0.1',
      'shadow-color': 'oklch(0 0 0)',
      'shadow-2xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      'shadow-xs': '0 1px 3px 0px hsl(0 0% 0% / 0.05)',
      'shadow-sm': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      shadow: '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)',
      'shadow-md': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)',
      'shadow-lg': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)',
      'shadow-xl': '0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)',
      'shadow-2xl': '0 1px 3px 0px hsl(0 0% 0% / 0.25)',

      // Typography
      'tracking-normal': '0em',
      spacing: '0.25rem',
    },
  },
  theme3: {
    name: 'Ocean',
    description: 'Cool cyan-teal theme',
    light: {
      // Colors - OKLCH values from user's example
      background: 'oklch(0.9491 0.0085 197.0126)',
      foreground: 'oklch(0.3772 0.0619 212.6640)',
      card: 'oklch(0.9724 0.0053 197.0692)',
      'card-foreground': 'oklch(0.3772 0.0619 212.6640)',
      popover: 'oklch(0.9724 0.0053 197.0692)',
      'popover-foreground': 'oklch(0.3772 0.0619 212.6640)',
      primary: 'oklch(0.5624 0.0947 203.2755)',
      'primary-foreground': 'oklch(1.0000 0 0)',
      secondary: 'oklch(0.9244 0.0181 196.8450)',
      'secondary-foreground': 'oklch(0.3772 0.0619 212.6640)',
      muted: 'oklch(0.9295 0.0107 196.9723)',
      'muted-foreground': 'oklch(0.5428 0.0594 201.5662)',
      accent: 'oklch(0.9021 0.0297 201.8915)',
      'accent-foreground': 'oklch(0.3772 0.0619 212.6640)',
      destructive: 'oklch(0.5732 0.1901 25.5409)',
      'destructive-foreground': 'oklch(1.0000 0 0)',
      border: 'oklch(0.8931 0.0205 204.4136)',
      input: 'oklch(0.9244 0.0181 196.8450)',
      ring: 'oklch(0.5624 0.0947 203.2755)',
      'chart-1': 'oklch(0.5624 0.0947 203.2755)',
      'chart-2': 'oklch(0.6389 0.1029 201.5918)',
      'chart-3': 'oklch(0.7124 0.1075 201.2486)',
      'chart-4': 'oklch(0.7701 0.0979 201.1816)',
      'chart-5': 'oklch(0.8336 0.0771 200.9702)',
      sidebar: 'oklch(0.9280 0.0183 205.3151)',
      'sidebar-foreground': 'oklch(0.3772 0.0619 212.6640)',
      'sidebar-primary': 'oklch(0.5624 0.0947 203.2755)',
      'sidebar-primary-foreground': 'oklch(1.0000 0 0)',
      'sidebar-accent': 'oklch(0.9021 0.0297 201.8915)',
      'sidebar-accent-foreground': 'oklch(0.3772 0.0619 212.6640)',
      'sidebar-border': 'oklch(0.8931 0.0205 204.4136)',
      'sidebar-ring': 'oklch(0.5624 0.0947 203.2755)',

      // Fonts
      'font-sans': 'Courier New, monospace',
      'font-serif': 'Courier New, monospace',
      'font-mono': 'Courier New, monospace',

      // Layout
      radius: '0.125rem',

      // Shadows
      'shadow-x': '1px',
      'shadow-y': '1px',
      'shadow-blur': '2px',
      'shadow-spread': '0px',
      'shadow-opacity': '0.15',
      'shadow-color': 'hsl(185 70% 30% / 0.15)',
      'shadow-2xs': '1px 1px 2px 0px hsl(185 70% 30% / 0.07)',
      'shadow-xs': '1px 1px 2px 0px hsl(185 70% 30% / 0.07)',
      'shadow-sm': '1px 1px 2px 0px hsl(185 70% 30% / 0.15), 1px 1px 2px -1px hsl(185 70% 30% / 0.15)',
      shadow: '1px 1px 2px 0px hsl(185 70% 30% / 0.15), 1px 1px 2px -1px hsl(185 70% 30% / 0.15)',
      'shadow-md': '1px 1px 2px 0px hsl(185 70% 30% / 0.15), 1px 2px 4px -1px hsl(185 70% 30% / 0.15)',
      'shadow-lg': '1px 1px 2px 0px hsl(185 70% 30% / 0.15), 1px 4px 6px -1px hsl(185 70% 30% / 0.15)',
      'shadow-xl': '1px 1px 2px 0px hsl(185 70% 30% / 0.15), 1px 8px 10px -1px hsl(185 70% 30% / 0.15)',
      'shadow-2xl': '1px 1px 2px 0px hsl(185 70% 30% / 0.38)',

      // Typography
      'tracking-normal': '0em',
      spacing: '0.25rem',
    },
    dark: {
      // Colors - OKLCH values from user's example
      background: 'oklch(0.2068 0.0247 224.4533)',
      foreground: 'oklch(0.8520 0.1269 195.0354)',
      card: 'oklch(0.2293 0.0276 216.0674)',
      'card-foreground': 'oklch(0.8520 0.1269 195.0354)',
      popover: 'oklch(0.2293 0.0276 216.0674)',
      'popover-foreground': 'oklch(0.8520 0.1269 195.0354)',
      primary: 'oklch(0.8520 0.1269 195.0354)',
      'primary-foreground': 'oklch(0.2068 0.0247 224.4533)',
      secondary: 'oklch(0.3775 0.0564 216.5010)',
      'secondary-foreground': 'oklch(0.8520 0.1269 195.0354)',
      muted: 'oklch(0.2894 0.0412 218.8153)',
      'muted-foreground': 'oklch(0.6611 0.0975 195.0526)',
      accent: 'oklch(0.3775 0.0564 216.5010)',
      'accent-foreground': 'oklch(0.8520 0.1269 195.0354)',
      destructive: 'oklch(0.6168 0.2086 25.8088)',
      'destructive-foreground': 'oklch(0.9612 0 0)',
      border: 'oklch(0.3775 0.0564 216.5010)',
      input: 'oklch(0.3775 0.0564 216.5010)',
      ring: 'oklch(0.8520 0.1269 195.0354)',
      'chart-1': 'oklch(0.8520 0.1269 195.0354)',
      'chart-2': 'oklch(0.6611 0.0975 195.0526)',
      'chart-3': 'oklch(0.5804 0.0849 195.0673)',
      'chart-4': 'oklch(0.4269 0.0630 202.6247)',
      'chart-5': 'oklch(0.3142 0.0455 204.1575)',
      sidebar: 'oklch(0.2068 0.0247 224.4533)',
      'sidebar-foreground': 'oklch(0.8520 0.1269 195.0354)',
      'sidebar-primary': 'oklch(0.8520 0.1269 195.0354)',
      'sidebar-primary-foreground': 'oklch(0.2068 0.0247 224.4533)',
      'sidebar-accent': 'oklch(0.3775 0.0564 216.5010)',
      'sidebar-accent-foreground': 'oklch(0.8520 0.1269 195.0354)',
      'sidebar-border': 'oklch(0.3775 0.0564 216.5010)',
      'sidebar-ring': 'oklch(0.8520 0.1269 195.0354)',

      // Fonts
      'font-sans': 'Source Code Pro, monospace',
      'font-serif': 'Source Code Pro, monospace',
      'font-mono': 'Source Code Pro, monospace',

      // Layout
      radius: '0.125rem',

      // Shadows
      'shadow-x': '1px',
      'shadow-y': '1px',
      'shadow-blur': '2px',
      'shadow-spread': '0px',
      'shadow-opacity': '0.2',
      'shadow-color': 'hsl(180 70% 60% / 0.2)',
      'shadow-2xs': '1px 1px 2px 0px hsl(180 70% 60% / 0.10)',
      'shadow-xs': '1px 1px 2px 0px hsl(180 70% 60% / 0.10)',
      'shadow-sm': '1px 1px 2px 0px hsl(180 70% 60% / 0.20), 1px 1px 2px -1px hsl(180 70% 60% / 0.20)',
      shadow: '1px 1px 2px 0px hsl(180 70% 60% / 0.20), 1px 1px 2px -1px hsl(180 70% 60% / 0.20)',
      'shadow-md': '1px 1px 2px 0px hsl(180 70% 60% / 0.20), 1px 2px 4px -1px hsl(180 70% 60% / 0.20)',
      'shadow-lg': '1px 1px 2px 0px hsl(180 70% 60% / 0.20), 1px 4px 6px -1px hsl(180 70% 60% / 0.20)',
      'shadow-xl': '1px 1px 2px 0px hsl(180 70% 60% / 0.20), 1px 8px 10px -1px hsl(180 70% 60% / 0.20)',
      'shadow-2xl': '1px 1px 2px 0px hsl(180 70% 60% / 0.50)',

      // Typography
      'tracking-normal': '0em',
      spacing: '0.25rem',
    },
  },
};

export type ThemeKey = keyof typeof themes;
