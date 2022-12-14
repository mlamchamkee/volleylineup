import * as React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      id="footer"
      sx={{
        pb: 1,
        px: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">

        {'Copyright © '}
        <Link color="inherit" href="https://github.com/mlamchamkee/volleylineup">
          Volley Lineup
        </Link>
        {' '}
        {new Date().getFullYear()}
        {' | v0.3'}
      </Typography>
    </Box>
  );
}

export default Footer;
