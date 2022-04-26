import './App.scss';
import AllRoutes from "./routes";
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { EXIST_LOCAL_STORAGE } from './services/constants'

function App() {
  const [darkTheme, setDarkTheme] = useState(createTheme({
    palette: {
      mode: 'light',
    },
  }))




  useEffect(() => {
    let themeMode = '';
    let THEME_MODE = localStorage.getItem(EXIST_LOCAL_STORAGE.THEME_MODE);

    if (THEME_MODE === 'dark') {
      document.getElementsByTagName("body")[0].setAttribute("data-theme", "dark");
      themeMode = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    } else {
      document.getElementsByTagName("body")[0].setAttribute("data-theme", "light");
      themeMode = createTheme({
        palette: {
          mode: 'light',
        },
      });
    }
    setDarkTheme(themeMode)

  }, [])


  return (
    <ThemeProvider theme={darkTheme}>
      <AllRoutes />
    </ThemeProvider>


  );
}

export default App;
