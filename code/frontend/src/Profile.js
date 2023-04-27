import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';

import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate,useLocation } from 'react-router-dom';
import Deposits from './Student_DashBoard_components/Deposits';
// import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
import { Button, TextField  } from '@mui/material';

import axios from 'axios';
import Alert from '@mui/material/Alert';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import Dialog from '@mui/material/Dialog';
import { Transition } from 'react-transition-group';
import Stack from '@mui/material/Stack';

import { useEffect, useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const set = (keyName, keyValue, ttl) => {
  const data = {
      value: keyValue,                  // store the value within this object
      ttl: Date.now() + (ttl * 1000),   // store the TTL (time to live)
  }
  localStorage.setItem(keyName, JSON.stringify(data));
};
const get = (keyName) => {
  const data = localStorage.getItem(keyName);
  if (!data) {     // if no value exists associated with the key, return null
      return null;
  }
  const item = JSON.parse(data);
  if (Date.now() > item.ttl) {
    localStorage.removeItem(keyName);
    localStorage.removeItem('role');
    localStorage.removeItem('user');
      return null;
  }
  return item.value;
};
const drawerWidth = 240;
const TransitionX = React.forwardRef(function TransitionX(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent({setIsLoggedIn,navigate,user }) {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const [username, setUsername] = useState(user.user.username);
  const [email, setEmail] = useState(user.user.email);
  const [phone, setPhone] = useState(user.user.phone);

  const [error, setError] = useState(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/user/${user.user._id}`,{
      username : username,
      email : email,
      phone : phone
    },{headers:{'Authorization':get('token')}})
    .then((resp)=>{   // if no error
      console.log("HandleSave:\n");
      console.log(resp);
      setOpenEdit(false);
      setError(null);
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response.data.message.codeName);
      // setError("Error");
    })
  }
  

  useEffect(() => {
    axios.get(`http://localhost:5000/user/${user.user._id}`,{headers:{'Authorization':get('token')}})
    .then((resp)=>{   // if no error
      console.log(resp);
      setUsername(resp.data.data.username);
      setEmail(resp.data.data.email);
      setPhone(resp.data.data.phone);
    })
    .catch((err)=>{
      console.log(err);
      // setError(err.response.data.message.message);
    })
  }, [openEdit])


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              My Profile
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/* {mainListItems}*/}
            <ListItemButton onClick={() => {
              navigate('/dashboard', {
                state: {
                  user : user
                }
              });
            }}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            {/* <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton> */}
            <ListItemButton onClick={() => {
              navigate('/profile', {
                state: {
                  user : user
                }
              });
            }}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            {
              get('role') == "TEACHER" ? 
              <ListItemButton onClick={() => {
                navigate('/create', {
                  state: {
                    user : user,
                  }
                });
              }}>
                <ListItemIcon>
                  <AddCircleOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary="New Course" />
              </ListItemButton> : 
              <ListItemButton onClick={() => {
                navigate('/join', {
                  state: {
                    user : user,
                  }
                });
              }}>
                <ListItemIcon>
                  <AddCircleOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary="New Course" />
              </ListItemButton>
            }
            <ListItemButton onClick={() => {
              navigate('/progress', {
                state: {
                  user : user
                }
              });
            }}>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Your Progress" />
            </ListItemButton>
            <ListItemButton onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              localStorage.removeItem('role');
              setIsLoggedIn(false);
            }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {/* <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits user={user}/>
                </Paper> */}

                {/*  */}
                <div className="Profile">
                    <div>
                    <Button variant="outlined"  onClick={handleClickOpenEdit}>
                      Edit Profile
                    </Button>
                    <div style={{padding:"10px"}}></div>
                    <Dialog
                      fullScreen
                      open={openEdit}
                      onClose={handleCloseEdit}
                      TransitionComponent={TransitionX}
                    >
                      <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                          <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseEdit}
                            aria-label="close"
                          >
                            <CloseIcon />
                          </IconButton>
                          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                           Edit Profile
                          </Typography>
                          <Button autoFocus color="inherit" onClick={handleSave}>
                            save
                          </Button>
                        </Toolbar>
                      </AppBar>
                      <List>
                      {error ? <Alert severity="error">{error}</Alert> : ""}
                        <ListItem>
                        <TextField fullWidth id="standard-basic" label="Username" variant="filled" defaultValue={username} onChange={(e) => setUsername(e.target.value)}/>
                          {/* <TextField fullWidth  id="standard-basic" label="Title" variant="filled" onChange={(e) => setTitle(e.target.value)}/> */}
                        </ListItem>
                        <Divider />
                        <ListItem>
                        <TextField fullWidth id="standard-basic" label="Email" variant="filled" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                          {/* <TextField fullWidth  id="standard-basic" label="Description" variant="filled" multiline rows={5} onChange={(e)=>setDescription(e.target.value)}/> */}
                        </ListItem>
                        <Divider />
                        <ListItem>
                        <TextField fullWidth id="standard-basic" label="Phone number" variant="filled" defaultValue={phone} onChange={(e) => setPhone(e.target.value)}/>
                          {/* <TextField fullWidth  id="standard-basic" label="Title" variant="filled" onChange={(e) => setTitle(e.target.value)}/> */}
                        </ListItem>
                        {/* {error1 ? <Alert severity="error">{error1}</Alert> : ""} */}

                      </List>
                    </Dialog>
                    </div>
                    <Box sx={{ width: '100%' }}>
                      <Stack spacing={2}>
                      {/* {rows.map(announcement =>  */}
                        <Item>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary={`username: ${username}`}

                            />
                          </ListItem>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary={`phone number : ${phone}`}
                            />
                          </ListItem>
                          <ListItem alignItems="flex-start">
                            <ListItemText
                              primary={`email : ${email}`}
                            />
                          </ListItem>
                        </Item>
                      {/* )} */}
                      </Stack>
                    </Box>

                </div>
                {/*  */}

              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4  */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Profile() {
  const navigate = useNavigate();
  const {state} = useLocation();
  const [isLoggedIn, setIsLoggedIn] = React.useState(get('token') !== null);
  React.useEffect(() => {
    if(get('token') === null ){
      navigate('/');
    }
    if( state === null) {
      localStorage.removeItem('token');
      navigate('/');
    }
  },[isLoggedIn]);
  console.log(state);
  return <DashboardContent  setIsLoggedIn={setIsLoggedIn} navigate={navigate} user={state.user} />;
}
