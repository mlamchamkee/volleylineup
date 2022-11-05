import * as React from 'react';

import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Unstable_Grid2';

import Player from '../components/Player';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MAIN_THEME } from '../../utils/constants';

type OrderType = {
  6: Array<number>,
  7: Array<number>,
  8: Array<number>,
  9: Array<number>,
  10: Array<number>,
};
function Court() {
  const { playerCount, currentLineup } = useAppSelector((state) => state.app);
  const order: OrderType = {
    6: [99, 3, 2, 1, 99, 99, 4, 5, 0, 99],
    7: [99, 3, 2, 1, 99, 4, 5, 6, 0, 99],
    8: [99, 3, 2, 1, 99, 4, 5, 6, 7, 0],
    9: [4, 3, 2, 1, 99, 5, 6, 7, 8, 0],
    10: [5, 4, 3, 2, 1, 6, 7, 8, 9, 0],
  };

  const offNums: OrderType = {
    6: [],
    7: [4],
    8: [0, 4],
    9: [0, 4, 5],
    10: [0, 1, 5, 6],
  };

  const gridItems:Array<HTMLElement> = order[playerCount].map((num) => {
    const player = currentLineup[num];
    if (player) {
      let backgroundColor = MAIN_THEME.fontColor;
      if (offNums[playerCount].includes(num)) backgroundColor = MAIN_THEME.backgroundGrey;

      return (
        <Grid2 key={num} item xs={2.4}>
          <Player name={player.name} position={player.position} backgroundColor={backgroundColor} />
        </Grid2>
      );
    }
    return <Grid2 key={num + Math.random()} item xs={2.4} />;
  });

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 3,
    }}
    >
      <Box sx={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center', maxWidth: 0.98,
      }}
      >
        <Grid2 container spacing={1}>
          {gridItems}
        </Grid2>
      </Box>
    </Box>
  );
}

export default Court;
