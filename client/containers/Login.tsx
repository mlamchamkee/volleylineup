import * as React from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import OauthButton from '../components/OauthButton';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { toggleCreateAccount, toggleLogin } from '../redux/reducer';
import { useAppDispatch, useAppSelector } from '../redux/store';

function Login() {
  const { showLogin, showCreateAccount } = useAppSelector((state) => state.app);

  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(toggleLogin());
  const handleCreateAccount = () => dispatch(toggleCreateAccount());

  return (
    <div>
      <Dialog
        open={showLogin}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" textAlign="center">
          {/* Log into your account */}
          <Box sx={{mt: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {showCreateAccount && 'Create an account'}
              {!showCreateAccount && 'Log in'}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{p:0}}>
          {/* <Box
            sx={{
              display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '25vh',
            }}
          >
            <OauthButton provider="google" logoUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png" />
            <OauthButton provider="facebook" logoUrl="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/150px-Facebook_f_logo_%282021%29.svg.png" />
          </Box> */}
          <Container component="main" maxWidth="xs">
            {/* <CssBaseline /> */}
            <Box
              sx={{
                marginTop: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box component="form" onSubmit={handleClose} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {showCreateAccount && 'Sign Up'}
                  {!showCreateAccount && 'Log In'}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {!showCreateAccount && 'Forgot password?'}
                    </Link>
                  </Grid>
                  <Grid item>
                    <ButtonBase onClick={handleCreateAccount}>
                      <Link variant="body2">
                        {showCreateAccount && 'Already an account? Log In'}
                        {!showCreateAccount && 'Don\'t have an account? Sign Up'}
                      </Link>
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login;
