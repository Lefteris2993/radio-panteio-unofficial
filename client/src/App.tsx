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
