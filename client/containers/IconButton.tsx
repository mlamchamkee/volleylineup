import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

const handleClick = () => {
  console.log('Lineup Saved');
};

function IconButton() {
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
