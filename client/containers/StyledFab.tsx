import * as React from 'react';

import CachedIcon from '@mui/icons-material/Cached';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';

import { rotate } from '../redux/reducer';
import { useAppDispatch } from '../redux/store';

function StyledFab() {
  const dispatch = useAppDispatch();
  const handleClick = () => dispatch(rotate());

  return (
    <Box sx={{ height: 80 }}>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 35,
          left: 0,
          right: 0,
          margin: '0 auto',
        }}
      >
        <CachedIcon />
      </Fab>
    </Box>
  );
}

export default StyledFab;
