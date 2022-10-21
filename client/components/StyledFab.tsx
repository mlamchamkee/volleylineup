import * as React from 'react';

import CachedIcon from '@mui/icons-material/Cached';
import Fab from '@mui/material/Fab';

import { rotate } from '../redux/reducer';
import { useAppDispatch, useAppSelector } from '../redux/store';

function StyledFab() {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(rotate());

  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={handleClick}
      sx={{
        position: 'fixed',
        zIndex: 1,
        bottom: 10,
        left: 0,
        right: 0,
        margin: '0 auto',
      }}
    >
      <CachedIcon />
    </Fab>
  );
}

export default StyledFab;
