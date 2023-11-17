import React, { createContext, useState, useContext } from 'react';
import { themes } from '../../Styles/themes';

const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

type ThemeType = 'light' | 'dark';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
