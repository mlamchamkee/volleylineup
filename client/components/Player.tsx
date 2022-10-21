import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Player(props) {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 65, backgroundColor: props.backgroundColor }}>
      <CardContent sx={{
        p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <Typography gutterBottom variant="body1" component="div">
          {props.name.split(' ')[0]}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {props.position}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Player;
