import * as React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid2 from '@mui/material/Unstable_Grid2';

import Player from '../components/Player';
import { useAppDispatch, useAppSelector } from '../redux/store';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Court() {
  const { currentLineup } = useAppSelector((state) => state.app);
  const order = {
    6: [3, 2, 1, 4, 5, 0],
  };
  const gridItems = order[6].map((num) => (
    <Grid2 item xs={4}>
      <Player name={currentLineup[num].name} position={currentLineup[num].position} />
    </Grid2>
  ));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
      <Box sx={{
        display: 'flex', flexDirection: 'row', justifyContent: 'center', maxWidth: 352,
      }}
      >
        <Grid2 container spacing={2}>
          {gridItems}
        </Grid2>
      </Box>
    </Box>
  );
}

export default Court;
