import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { store } from './redux/store';
import AppNavbar from './components/AppNavbar';
import StyledFab from './components/StyledFab';
import NumberPlayers from './containers/NumberPlayers';
import Court from './containers/Court';
import Roster from './containers/Roster';
import { MAIN_THEME } from '../utils/constants';
import Login from './containers/Login';
import IconButton from './containers/IconButton';

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
      <Court />
      <StyledFab />
      <Login />
    </Provider>
  </ThemeProvider>,
);
