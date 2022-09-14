import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SocketProvider } from 'context/socket';
import AppBody from 'components/AppBody';
import Footer from 'components/Footer';
import Header from 'components/Header';
import { LocalSettingsProvider } from 'context/localSettings';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
  palette: {
    primary: {
      main: '#540808',
      light: '#820c0c',
    },
    secondary: {
      main: '#dce6ea',
      contrastText: '#142532',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalSettingsProvider>
        <Header />
        <SocketProvider>
          <AppBody />
        </SocketProvider>
        <Footer />
      </LocalSettingsProvider>
    </ThemeProvider>
  );
}

export default App;
