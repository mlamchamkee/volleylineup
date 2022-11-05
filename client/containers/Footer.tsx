import * as React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      id="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/mlamchamkee/volleylineup">
          Volley Lineup
        </Link>
        {' '}
        {new Date().getFullYear()}
        .
      </Typography>
    </Box>
  );
}

export default Footer;
