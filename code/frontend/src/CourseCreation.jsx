// import React, { useState } from 'react';
import './CourseCreation.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function CourseCreation() {
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token') !== null);
//   React.useEffect(() => {
//     if(localStorage.getItem('token') == null){
//       navigate('/');
//     }
//   },[isLoggedIn]);

//   const [courseName, setCourseName] = useState('');
//   const [courseCode, setCourseCode] = useState('');
//   const [description, setDescription] = useState('');
//   const [instructorName, setInstructorName] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       name : courseName,
//       courseCode: courseCode,
//       description: description,
//     });
//     const signupData = {
//       name : courseName,
//       courseCode: courseCode,
//       description: description,
//     };
//     axios.post('http://localhost:5000/course',signupData, {headers:{'Authorization':localStorage.getItem('token')}})
//     .then((resp)=>{   // if no error
//       console.log(resp);
//       // setError('Signed up successfully!'); // subject to change
//       // if(resp.response.status == 401){
//       //   setError('You can not create a course!');
//       // } else {
//         navigate('/dashboard');
//       // }
//     })
//     .catch((err)=>{
//       console.log(err);
//       setError(err.response.data.message.message);
//     })
//   };

//   return (
//     <div className="course-creation">
//       <h1>Create a Course</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="courseName">Course Name</label>
//           <input
//             type="text"
//             name="courseName"
//             value={courseName}
//             onChange={(event) => setCourseName(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="courseCode">Course Code</label>
//           <input
//             type="text"
//             name="courseCode"
//             value={courseCode}
//             onChange={(event) => setCourseCode(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description</label>
//           <textarea
//             name="description"
//             value={description}
//             onChange={(event) => setDescription(event.target.value)}
//           ></textarea>
//         </div>
//         {/* <div className="form-group">
//           <label htmlFor="instructorName">Instructor Name</label>
//           <input
//             type="text"
//             name="instructorName"
//             value={instructorName}
//             onChange={(event) => setInstructorName(event.target.value)}
//           />
//         </div> */}
//         <div className="form-group">
//           <label style={{color:'red'}}>{error}</label>
//         </div>
//         <button type="submit">Create Course</button>
//       </form>
//     </div>
//   );
// }

// export default CourseCreation;





import * as React from 'react';
import { useState, useEffect } from 'react';

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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate , useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';

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
function Title(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
function DashboardContent({setIsLoggedIn,navigate,user }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [error, setError] = useState('');

  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [instructorName, setInstructorName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name : courseName,
      courseCode: courseCode,
      description: description,
    });
    const signupData = {
      name : courseName,
      courseCode: courseCode,
      description: description,
    };
    axios.post('http://localhost:5000/course',signupData, {headers:{'Authorization':get('token')}})
    .then((resp)=>{   // if no error
      console.log(resp);
      // setError('Signed up successfully!'); // subject to change
      // if(resp.response.status == 401){
      //   setError('You can not create a course!');
      // } else {
        navigate('/dashboard', {
          state: {
            user : user
          }
        });
      // }
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response.data.message);
    })
  };

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
              Create Course
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
            <ListItemButton onClick={() => {
              navigate('/create', {
                state: {
                  user : user
                }
              });
            }}>
              <ListItemIcon>
                <AddCircleOutlineIcon/>
              </ListItemIcon>
              <ListItemText primary="New Course" />
            </ListItemButton>
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
              {/* Chart */}
              {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}
              {/* Recent Deposits */}
              {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
              {/* Recent Orders */}
              <Grid item xs={12}>
              <div className="course-creation">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="courseName">Course Name</label>
                    <input
                      type="text"
                      name="courseName"
                      value={courseName}
                      onChange={(event) => setCourseName(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="courseCode">Course Code</label>
                    <input
                      type="text"
                      name="courseCode"
                      value={courseCode}
                      onChange={(event) => setCourseCode(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                    ></textarea>
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="instructorName">Instructor Name</label>
                    <input
                      type="text"
                      name="instructorName"
                      value={instructorName}
                      onChange={(event) => setInstructorName(event.target.value)}
                    />
                  </div> */}
                  <div className="form-group">
                    <label style={{color:'red'}}>{error}</label>
                  </div>
                  <button type="submit">Create Course</button>
                </form>
              </div>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function CourseCreation() {
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
  return <DashboardContent  setIsLoggedIn={setIsLoggedIn} navigate={navigate} user={state.user} />;
}
