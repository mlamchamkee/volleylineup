import React, { useEffect } from 'react';

import Box from '@mui/material/Box';

import AppNavbar from './containers/AppNavbar';
import Court from './containers/Court';
import Footer from './containers/Footer';
import IconButton from './containers/IconButton';
import Login from './containers/Login';
import Net from './containers/Net';
import NumberPlayers from './containers/NumberPlayers';
import Roster from './containers/Roster';
import StyledFab from './containers/StyledFab';
import { getLineup } from './redux/reducer';
import { useAppDispatch, useAppSelector } from './redux/store';

export default function App() {
  const { isLoggedIn, playerCount } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) dispatch(getLineup(playerCount));
  }, []);

  return (
    <Box>
      <AppNavbar />
      <NumberPlayers />
      <Roster />
      <IconButton />
      <Net />
      <Court />
      <StyledFab />
      <Footer />
      <Login />
    </Box>
  );
}
