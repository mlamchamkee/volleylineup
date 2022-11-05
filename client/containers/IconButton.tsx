import * as React from 'react';

import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { postLineup } from '../redux/reducer';
import { useAppDispatch, useAppSelector } from '../redux/store';

function IconButton() {
  const { playerCount, lineup } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(postLineup({ playerCount, lineup }));
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={handleClick}
      >
        Save Lineup
      </Button>
    </Box>
  );
}

export default IconButton;
