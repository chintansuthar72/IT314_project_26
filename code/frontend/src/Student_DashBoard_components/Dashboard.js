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
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
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
import Deposits from './Deposits';
import Orders from './Orders';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

function DashboardContent({setIsLoggedIn,navigate,user }) {
// function DashboardContent() {
// const user = "student";
// const navigate = true;
// const setIsLoggedIn = (val) =>{
//   console.log("hello");
// }
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [filteredResults, setFilteredResults] = React.useState([]);


  useEffect(() => {
    axios.get('http://localhost:5000/user/courses',{headers:{'Authorization': get('token')}})
      .then((resp)=>{   // if no error
        console.log(resp);
        setFilteredResults(resp.data.data);
        setRows(resp.data.data.sort((a,b)=>{
          if(Date.parse(a.course.updatedAt) < Date.parse(b.course.updatedAt)) return 1;
          else return -1;
        }));
      })
      .catch((err)=>{
        console.log(err);
        setError(err.response.data.error);
      })
  },[]);

  useEffect(() => {
    const len = searchInput.length;
    if (len != 0) {
      const filteredData = rows.filter((item) => {
          const wholeString = item.instructor + " " + item.course.courseCode + " " + item.course.name + " " + item.course.description;
          return wholeString.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(rows);
    }
  }, [searchInput]);

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
              Dashboard
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </Search>
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
                  user : user,
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
                  user : user,
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
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {/* <Orders /> */}
                  {error && <div>{error}</div>}
                  <>
                    <Title>Classes</Title>
                    <Table size="medium">
                      <TableHead>
                        <TableRow>
                          <TableCell>Course Code</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Instructor</TableCell>
                          {/* <TableCell>Class link</TableCell>
                          <TableCell align="right">number of students</TableCell> */}
                        </TableRow>
                      </TableHead>
                      {/* <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.course._id}>
                            <TableCell>{row.course.courseCode}</TableCell>
                            <TableCell>{row.course.name}</TableCell>
                            <TableCell>{row.instructor}</TableCell>
                            <TableCell align='right'><Button onClick={() => {
                              navigate('/manage',{
                                state: {
                                  course: row.course,
                                  instructor: row.instructor, 
                                  user: user,
                                }
                              })
                            }}>Open</Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody> */}
                      <TableBody>
                        {filteredResults.map((val,idx) => {
                          return (
                            <TableRow key={val.course._id}>
                              {/* {console.log(val.course.name,val.course.courseCode,val.course.description )} */}
                              <TableCell>{val.course.courseCode}</TableCell>
                              <TableCell>{val.course.name}</TableCell>
                              <TableCell>{val.instructor}</TableCell>
                              {/* <TableCell>{val.course.description }</TableCell>
                              <TableCell>{ <Button variant="contained" onClick={() => handleEnroll(val.course._id)}>Enroll</Button>}</TableCell> */}
                              <TableCell align='right'><Button onClick={() => {
                              navigate('/manage',{
                                state: {
                                  course: val.course,
                                  instructor: val.instructor, 
                                  user: user,
                                }
                              })
                            }}>Open</Button></TableCell>
                            </TableRow>
                                )
                          })}
                      </TableBody>
                    </Table>
                    {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                      See more orders
                    </Link> */}
                  </>
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
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
  return <DashboardContent  setIsLoggedIn={setIsLoggedIn} navigate={navigate} user={state.user}/>;
  // return <DashboardContent  setIsLoggedIn={setIsLoggedIn} navigate={navigate} user={"milind"}/>;

}
