import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setPlayerCount } from '../redux/reducer';

export default function NumberPlayers() {
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
