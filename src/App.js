import { Navbar } from './components/layout/Navbar'

import Kit from './components/Kit';

import { GlobalStyles } from './css/global';
import { lightTheme, darkTheme } from './css/theme';
import Container from './css/container'
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './hooks/useDarkMode';

const App = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />
  };

  return (
    <ThemeProvider theme={themeMode}>
      <>
      <GlobalStyles />
        <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Container>
            <Kit />
          </Container>
      </>
    </ThemeProvider>
  );
}

export default App;
