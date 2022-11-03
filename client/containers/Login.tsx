import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { toggleLogin } from '../redux/reducer';

function Login() {
  const { showLogin } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(toggleLogin());

  // const handleClickGoogle = () => dispatch(toggleLogin());

  return (
    <div>
      <Dialog
        open={showLogin}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
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
              href="/auth/google"
              // onClick={handleClick}
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Box>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png" />
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
