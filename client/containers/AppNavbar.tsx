import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { toggleLogin, clearCookies, syncCookies } from '../redux/reducer';

const settings = ['Logout'];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { isLoggedIn, email, picture } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const handleLogin = () => dispatch(toggleLogin());
  const handleLogout = () => {
    dispatch(clearCookies());
    dispatch(syncCookies());
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ width: 40, height: 40 }} />

          <img alt="logo" src="../assets/logo2.png" style={{ height: 40 }} />
          <Box sx={{ }}>
            {!isLoggedIn && (
            <IconButton color="warning" onClick={handleLogin} sx={{ p: 0 }}>
              <LoginIcon />
            </IconButton>
            )}
            {isLoggedIn && (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={email?.toUpperCase()} src={picture} />
              </IconButton>
            </Tooltip>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="logout" onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
