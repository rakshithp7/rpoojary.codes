import { themes, type ThemeKey, type ThemeVariables } from './themes';

export type { ThemeKey };

const THEME_STORAGE_KEY = 'theme-key';
const MODE_STORAGE_KEY = 'theme-mode';

/**
 * Apply CSS custom properties to the document root
 */
export function applyThemeVariables(variables: ThemeVariables): void {
  const root = document.documentElement;

  // Apply all CSS custom properties
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(`--${property}`, value);
  });

  // Update letter spacing specifically
  document.body.style.letterSpacing = variables['tracking-normal'] || '0';
}

/**
 * Apply a complete theme (light or dark variant)
 */
export function applyTheme(themeKey: ThemeKey, isDark: boolean): void {
  const theme = themes[themeKey];
  if (!theme) {
    console.warn(`Theme "${themeKey}" not found, falling back to default`);
    applyTheme('default', isDark);
    return;
  }

  const variables = isDark ? theme.dark : theme.light;
  applyThemeVariables(variables);

  // Store the current theme
  localStorage.setItem(THEME_STORAGE_KEY, themeKey);
}

/**
 * Get the current theme key from localStorage or default
 */
export function getStoredThemeKey(): ThemeKey {
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeKey | null;
  return stored && stored in themes ? stored : 'default';
}

/**
 * Get the current mode from localStorage or default
 */
export function getStoredMode(): 'light' | 'dark' | 'system' {
  const stored = localStorage.getItem(MODE_STORAGE_KEY) as 'light' | 'dark' | 'system' | null;
  return stored || 'system';
}

/**
 * Get the effective mode (resolves 'system' to actual light/dark)
 */
export function getEffectiveMode(mode: 'light' | 'dark' | 'system', prefersDark: boolean): boolean {
  if (mode === 'system') {
    return prefersDark;
  }
  return mode === 'dark';
}

/**
 * Apply mode (light/dark) and update the document class
 */
export function applyMode(isDark: boolean): void {
  const root = document.documentElement;

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Initialize theme system - applies stored theme and mode
 */
export function initializeTheme(): { themeKey: ThemeKey; mode: 'light' | 'dark' | 'system'; isDark: boolean } {
  const themeKey = getStoredThemeKey();
  const mode = getStoredMode();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = getEffectiveMode(mode, prefersDark);

  applyTheme(themeKey, isDark);
  applyMode(isDark);

  // Store the current mode preference to persist it
  localStorage.setItem(MODE_STORAGE_KEY, mode);

  return { themeKey, mode, isDark };
}

/**
 * Get all available themes
 */
export function getAvailableThemes() {
  return Object.entries(themes).map(([key, theme]) => ({
    key: key as ThemeKey,
    name: theme.name,
    description: theme.description,
  }));
}

/**
 * Watch for system theme changes
 */
export function watchSystemTheme(callback: (isDark: boolean) => void): () => void {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
    const mode = getStoredMode();
    if (mode === 'system') {
      const isDark = event.matches;
      applyMode(isDark);
      callback(isDark);
    }
  };

  handleChange(mediaQuery);
  mediaQuery.addEventListener('change', handleChange);

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}
