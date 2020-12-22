import { Navbar } from './components/layout/Navbar'

import Kit from './components/kit/Kit';
import Mobile from './components/layout/Mobile';

import { GlobalStyles } from './css/global';
import { lightTheme, darkTheme } from './css/theme';
import Container from './css/container'
import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './hooks/useDarkMode';
import { isMobile } from "react-device-detect";

import KitState from './context/kit/KitState';
import SampleState from './context/sample/SampleState';
import LoopState from './context/loop/LoopState';
import HelpState from './context/help/HelpState';

import ReactGA from 'react-ga';
ReactGA.initialize(process.env.GOOGLEANALYTICS);

const App = () => {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />
  };

  if (isMobile) {
    return (
      <Container>
        <Mobile />
      </Container>
    )
  }

  return (
    <KitState>
      <SampleState>
        <LoopState>
          <HelpState>
            <ThemeProvider theme={themeMode}>
              <>
              <GlobalStyles />
                <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <Container>
                    <Kit />
                  </Container>
              </>
            </ThemeProvider>
          </HelpState>
        </LoopState>
      </SampleState>      
    </KitState>
  );
}

export default App;
