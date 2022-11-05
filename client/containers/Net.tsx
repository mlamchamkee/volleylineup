import * as React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

function Net() {
  return (
    <Box sx={{ mt: 3 }}>
      <Divider />
      <Box sx={{
        width: '98vw', display: 'flex', justifyContent: 'center', mt: 2,
      }}
      >
        <img alt="net" src="../assets/volley-net.png" style={{ height: 50, width: '60vw', maxWidth: 320 }} />
      </Box>
    </Box>

  );
}

export default Net;
