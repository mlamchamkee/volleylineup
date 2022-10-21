import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';

import Player from '../components/Player';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MAIN_THEME } from '../../utils/constants';

function Court() {
  const { playerCount, currentLineup } = useAppSelector((state) => state.app);
  const order = {
    6: [99, 3, 2, 1, 99, 99, 4, 5, 0, 99],
    7: [99, 3, 2, 1, 99, 4, 5, 6, 0, 99],
    8: [99, 3, 2, 1, 99, 4, 5, 6, 7, 0],
    9: [4, 3, 2, 1, 99, 5, 6, 7, 8, 0],
    10: [5, 4, 3, 2, 1, 6, 7, 8, 9, 0],
  };
  const gridSize = {
    6: 2.4,
    7: 2.4,
    8: 2.4,
  };
  const offNums = {
    6: [],
    7: [4],
    8: [0, 4],
    9: [0, 4, 5],
    10: [0, 1, 5, 6],
  };

  const gridItems = order[playerCount].map((num) => {
    const player = currentLineup[num];
    if (player) {
      let backgroundColor = MAIN_THEME.fontColor;
      if (offNums[playerCount].includes(num)) backgroundColor = MAIN_THEME.backgroundGrey;

      return (
        <Grid2 item xs={2.4}>
          <Player name={player.name} position={player.position} backgroundColor={backgroundColor} />
        </Grid2>
      );
    }
    return <Grid2 item xs={2.4} />;
  });

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row', justifyContent: 'center', mt: 5,
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
