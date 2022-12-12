import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext();

function ToggleColorMode({ children }) {
  const [mode, setMode] = useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
    palette: {
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
          },
          yelloww:{
              main: '#ffb703',
              contrastText: '#03071e',
            },
            redd:{
              main: '#d00000',
              contrastText: '#fff',
            },
            soraty:{
              main: '#ef476f',
              contrastText: '#fff',
            },
            black:{
              main: '#000000',
              contrastText: '#fff',
            },
            white:{
                main: '#fff',
                contrastText:'#000000' ,
            },
            ingolo:{
              main: '#7400b8',
              contrastText:'#000000' ,
          },
       
      mode,
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;