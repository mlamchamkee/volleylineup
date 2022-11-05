import * as React from 'react';

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
import { clearCacheLineup, getLineup, postLineup } from './redux/reducer';
import { useAppDispatch, useAppSelector } from './redux/store';

export default function App() {
  const { isLoggedIn, cacheLineup, playerCount } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isLoggedIn && cacheLineup) {
      dispatch(postLineup({ playerCount, lineup: cacheLineup }));
      sessionStorage.removeItem('playerCount');
      sessionStorage.removeItem('lineup');
    }
    if (isLoggedIn) {
      dispatch(getLineup(playerCount));
      dispatch(clearCacheLineup());
    }
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
