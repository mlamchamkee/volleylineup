import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { store } from './redux/store';
import AppNavbar from './components/AppNavbar';
import StyledFab from './components/StyledFab';
import Court from './containers/Court';
import Roster from './containers/Roster';
import { MAIN_THEME } from '../utils/constants';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const theme = createTheme({
  palette: {
    primary: {
      main: MAIN_THEME.color,
      contrastText: '#fff',
    },
    secondary: {
      main: '#606F7B',
      contrastText: '#fff',
    },
    info: {
      main: '#8795A1',
      contrastText: '#fff',
    },
  },
});

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AppNavbar />
      <Roster />
      <Court />
      <StyledFab />
    </Provider>
  </ThemeProvider>,
);
