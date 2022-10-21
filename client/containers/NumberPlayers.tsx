import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import GroupsIcon from '@mui/icons-material/Groups';

import { useAppDispatch, useAppSelector } from '../redux/store';
import { setPlayerCount } from '../redux/reducer';

export function NumberPlayers0() {
  const { playerCount } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    dispatch(setPlayerCount(event.target.value));
  };

  return (
    <FormControl sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">Number of Players</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={playerCount}
        onChange={handleChange}
      >
        <FormControlLabel value="6" control={<Radio />} label="6" />
        <FormControlLabel value="7" control={<Radio />} label="7" />
        <FormControlLabel value="8" control={<Radio />} label="8" />
      </RadioGroup>
    </FormControl>
  );
}

export default function NumberPlayers() {
  const { playerCount } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  // const [value, setValue] = React.useState<number | string | Array<number | string>>(
  //   30,
  // );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    // setValue(newValue);
    dispatch(setPlayerCount(newValue));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target);
    dispatch(setPlayerCount(event.target.value));
  };

  const handleBlur = () => {
    if (playerCount < 6) {
      dispatch(setPlayerCount(6));
    } else if (playerCount > 10) {
      dispatch(setPlayerCount(10));
    }
  };

  const marks = [
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '7',
    },
    {
      value: 8,
      label: '8',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '10',
    },
  ];

  function valuetext(value: number) {
    return `${value}`;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
      <Box sx={{ width: 250 }}>
        <Typography id="input-slider" gutterBottom>
          Number of Players
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <GroupsIcon />
          </Grid>
          <Grid item xs>
            <Slider
              // value={typeof playerCount === 'number' ? playerCount : 6}
              aria-label="Custom marks"
              onChange={handleSliderChange}
              defaultValue={playerCount}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              // aria-labelledby="input-slider"
              step={1}
              marks={marks}
              min={6}
              max={10}
            />
          </Grid>
          {/* <Grid item>
            <Input
              value={playerCount}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 6,
                max: 11,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}
