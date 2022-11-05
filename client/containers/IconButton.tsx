import * as React from 'react';

import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import {
  cacheLineup, postLineup, toggleLogin, toggleSavePopover,
} from '../redux/reducer';
import { useAppDispatch, useAppSelector } from '../redux/store';

function IconButton() {
  const {
    isLoggedIn, playerCount, lineup, showSavePopover,
  } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn) {
      dispatch(cacheLineup());
      dispatch(toggleLogin());
    }
    if (isLoggedIn) {
      dispatch(postLineup({ playerCount, lineup }));
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(toggleSavePopover());
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
      <Popover
        open={showSavePopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }}>
          {`${playerCount} Player Lineup Saved`}
        </Typography>
      </Popover>
    </Box>
  );
}

export default IconButton;
