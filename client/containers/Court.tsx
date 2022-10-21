import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Unstable_Grid2';

import Player from '../components/Player';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { MAIN_THEME } from '../../utils/constants';

function Court() {
  const { currentLineup } = useAppSelector((state) => state.app);
  const order = {
    6: [3, 2, 1, 4, 5, 0],
    8: [99, 3, 2, 1, 99, 4, 5, 6, 7, 0],
  };
  // const gridItems = order[6].map((num) => (
  //   <Grid2 item xs={4}>
  //     <Player name={currentLineup[num].name} position={currentLineup[num].position} />
  //   </Grid2>
  // ));

  const gridSize = {
    6: 4,
    8: 2.4,
  };

  const offNums = {
    6: [],
    8: [0, 4],
  };

  const numPlayers = 8;

  const gridItems = order[numPlayers].map((num) => {
    const player = currentLineup[num];
    if (player) {
      let backgroundColor = MAIN_THEME.fontColor;
      if (offNums[numPlayers].includes(num)) backgroundColor = MAIN_THEME.backgroundGrey;

      return (
        <Grid2 item xs={gridSize[numPlayers]}>
          <Player name={player.name} position={player.position} backgroundColor={backgroundColor} />
        </Grid2>
      );
    }
    return <Grid2 item xs={12 / 5} />;
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
