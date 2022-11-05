import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { MAIN_THEME } from '../utils/constants';
import AppNavbar from './containers/AppNavbar';
import Court from './containers/Court';
import Footer from './containers/Footer';
import IconButton from './containers/IconButton';
import Login from './containers/Login';
import Net from './containers/Net';
import NumberPlayers from './containers/NumberPlayers';
import Roster from './containers/Roster';
import StyledFab from './containers/StyledFab';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const theme = createTheme({
  palette: {
    primary: {
      main: MAIN_THEME.color,
      contrastText: '#fff',
    },
    secondary: {
      main: '#F0A500',
      contrastText: '#fff',
    },
    info: {
      main: '#8795A1',
      contrastText: '#fff',
    },
    warning: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AppNavbar />
      <NumberPlayers />
      <Roster />
      <IconButton />
      <Net />
      <Court />
      <Footer />
      <StyledFab />
      <Login />
    </Provider>
  </ThemeProvider>,
);
