import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Fade from '@material-ui/core/Fade';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddBoxIcon from '@material-ui/icons/AddBox';
import BookmarksIcon from '@material-ui/icons/Bookmarks';

const useStyles = makeStyles (theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing (2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    padding: theme.spacing (2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AppNavBar () {
  const classes = useStyles ();
  const [auth, setAuth] = React.useState (true);
  const [state, setState] = React.useState ({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [anchorEl, setAnchorEl] = React.useState (null);
  const open = Boolean (anchorEl);
  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState ({...state, [side]: open});
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer (side, false)}
      onKeyDown={toggleDrawer (side, false)}
    >
      <List>
        {[
          'Profile',
          'New Template',
          'Saved Templates',
          'Settings',
        ].map ((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 4 === 0 ? <AccountBoxIcon /> : null}
              {index % 4 === 1 ? <AddBoxIcon /> : null}
              {index % 4 === 2 ? <BookmarksIcon /> : null}
              {index % 4 === 3 ? <SettingsIcon /> : null}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Logout'].map ((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const handleChange = event => {
    setAuth (event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl (event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl (null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer ('left', true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ResumeBuilder
          </Typography>
          {auth &&
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="fade-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>}
        </Toolbar>
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer ('left', false)}
          onOpen={toggleDrawer ('left', true)}
        >
          {sideList ('left')}
        </SwipeableDrawer>
      </AppBar>
    </div>
  );
}
