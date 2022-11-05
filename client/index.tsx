import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { MAIN_THEME } from '../utils/constants';
import App from './App';
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
      <App />
    </Provider>
  </ThemeProvider>,
);
