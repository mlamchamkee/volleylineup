import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

type PropsType = {
  provider: string,
  logoUrl: string,
};

function OauthButton(props: PropsType): JSX.Element {
  const { provider, logoUrl } = props;
  return (
    <Button
      variant="outlined"
      href={`/auth/${provider}`}
      sx={{
        justifyContent: 'center', alignItems: 'center', my: 1, width: 231,
      }}
    >
      <Box sx={{ width: 30 }}>
        <img alt={`logo-${provider}`} src={logoUrl} style={{ width: 24, height: 24 }} />
      </Box>
      <Box sx={{
        my: 1, ml: 2, width: 200, display: 'flex', justifyContent: 'center',
      }}
      >
        {`Login With ${provider}`}
      </Box>
    </Button>
  );
}
export default OauthButton;
