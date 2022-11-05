import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { Typography } from '@mui/material';
import { toggleLogin } from '../redux/reducer';
import { useAppDispatch, useAppSelector } from '../redux/store';
import OauthButton from '../components/OauthButton';

function Login() {
  const { showLogin } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(toggleLogin());

  return (
    <div>
      <Dialog
        open={showLogin}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          Log into your account
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '25vh',
            }}
          >
            <OauthButton provider="google" logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png" />
            <OauthButton provider="facebook" logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/150px-Facebook_f_logo_%282021%29.svg.png" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login;
