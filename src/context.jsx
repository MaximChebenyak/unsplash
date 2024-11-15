import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

/* const getInitialDarksMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  return prefersDarkMode;
}; */
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;
  const storedDarkMode = localStorage.getItem('darkTheme');

  if (storedDarkMode === null) {
    return prefersDarkMode;
  }

  return storedDarkMode === 'true';
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {
    const newdDarkTheme = !isDarkTheme;
    setIsDarkTheme(newdDarkTheme);
    /*  const body = document.querySelector('body');
    body.classList.toggle('dark-theme', newdDarkTheme); */
    localStorage.setItem('darkTheme', newdDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
