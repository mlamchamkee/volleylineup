import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { toggleLogin } from '../redux/reducer';
import { useAppDispatch, useAppSelector } from '../redux/store';

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
              display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh',
            }}
          >
            <Button
              variant="outlined"
              href="/auth/facebook"
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Box>
                <img alt="logo-google" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png" />
              </Box>
              <Box sx={{ my: 1, ml: 2 }}>
                Login With Google
              </Box>
            </Button>
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
