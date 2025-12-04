import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Laptop, Moon, Palette, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  applyTheme,
  applyMode,
  getEffectiveMode,
  getAvailableThemes,
  watchSystemTheme,
  initializeTheme,
  type ThemeKey,
} from '@/lib/theme-utils';

type ThemeMode = 'light' | 'dark' | 'system';

const modes: Array<{ value: ThemeMode; label: string; icon: React.ReactNode }> = [
  { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4" /> },
  { value: 'system', label: 'System', icon: <Laptop className="h-4 w-4" /> },
];

export const ThemeToggle: React.FC = () => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [themeKey, setThemeKey] = useState<ThemeKey>('default');
  const [prefersDark, setPrefersDark] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize theme system
    const { themeKey: storedThemeKey, mode: storedMode, isDark } = initializeTheme();
    setMode(storedMode);
    setThemeKey(storedThemeKey);
    setPrefersDark(isDark);
    setIsInitialized(true);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // Watch for system theme changes
    const unwatch = watchSystemTheme((isDark) => {
      setPrefersDark(isDark);
      applyMode(isDark);
      applyTheme(themeKey, isDark);
    });

    return unwatch;
  }, [isInitialized, themeKey]);

  useEffect(() => {
    if (!isInitialized) return;

    const isDark = getEffectiveMode(mode, prefersDark);
    applyMode(isDark);
    applyTheme(themeKey, isDark);
  }, [mode, themeKey, prefersDark, isInitialized]);

  const isDarkMode = useMemo(() => getEffectiveMode(mode, prefersDark), [mode, prefersDark]);
  const effectiveIcon = isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />;

  const handleSelectMode = useCallback(
    (value: ThemeMode) => {
      setMode(value);
      localStorage.setItem('theme-mode', value);
    },
    [setMode]
  );

  const handleSelectTheme = useCallback(
    (value: ThemeKey) => {
      setThemeKey(value);
      localStorage.setItem('theme-key', value);
    },
    [setThemeKey]
  );

  const themes = getAvailableThemes();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-2 rounded-md border border-border/60 bg-secondary/40 px-3 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition',
            'hover:bg-secondary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background'
          )}
          aria-label="Open theme menu">
          <span className="flex items-center gap-2">{effectiveIcon}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60" sideOffset={8} align="end">
        <DropdownMenuLabel className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Mode</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={mode} onValueChange={(value) => handleSelectMode(value as ThemeMode)}>
          {modes.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value} className="gap-2">
              <span className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        {isMobile ? (
          <>
            <DropdownMenuLabel className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <Palette className="h-4 w-4 inline mr-2" />
              Theme
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup value={themeKey} onValueChange={(value) => handleSelectTheme(value as ThemeKey)}>
              {themes.map((item) => (
                <DropdownMenuRadioItem key={item.key} value={item.key} className="items-start gap-3">
                  <div className="flex flex-col text-left">
                    <span>{item.name}</span>
                    {item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        ) : (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Palette className="h-4 w-4" />
              Choose Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-64">
                <DropdownMenuLabel>Themes</DropdownMenuLabel>
                <DropdownMenuRadioGroup
                  value={themeKey}
                  onValueChange={(value) => handleSelectTheme(value as ThemeKey)}>
                  {themes.map((item) => (
                    <DropdownMenuRadioItem key={item.key} value={item.key} className="items-start gap-3">
                      <div className="flex flex-col text-left">
                        <span>{item.name}</span>
                        {item.description && <span className="text-xs text-muted-foreground">{item.description}</span>}
                      </div>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
