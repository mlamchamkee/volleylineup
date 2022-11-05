import * as React from 'react';

import GroupsIcon from '@mui/icons-material/Groups';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { getLineup, setPlayerCount } from '../redux/reducer';
import { useAppDispatch, useAppSelector } from '../redux/store';

export default function NumberPlayers() {
  const { playerCount } = useAppSelector((state) => state.app);
  const marks = [6, 7, 8, 9, 10].map((el) => ({ value: el, label: String(el) }));
  const dispatch = useAppDispatch();

  const handleSliderChange = async (event: Event, newValue: number) => {
    dispatch(getLineup(newValue));
    dispatch(setPlayerCount(newValue));
  };

  function valuetext(value: number) {
    return `${value}`;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
      <Box sx={{ width: 300 }}>
        <Typography textAlign="center">
          Number of Players
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <GroupsIcon />
          </Grid>
          <Grid item xs>
            <Slider
              aria-label="Custom marks"
              onChange={handleSliderChange}
              value={playerCount}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={6}
              max={10}
            />
          </Grid>
          <Grid item sx={{ width: 40 }} />
        </Grid>
      </Box>
    </Box>
  );
}
