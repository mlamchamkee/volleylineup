import * as React from 'react';

import Box from '@mui/material/Box';

function Net() {
  return (
    <Box sx={{
      width: '98vw', display: 'flex', justifyContent: 'center', mt: 3,
    }}
    >
      <img alt="net" src="../assets/volley-net.png" style={{ height: 50, width: '60vw', maxWidth: 320 }} />
    </Box>
  );
}

export default Net;
