import * as React from 'react';
import { useEffect } from 'react';
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
import { mainListItems, secondaryListItems } from './listItems';
import Navbar1 from './Navbar1';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
import { colors } from '@mui/material';
// import { Card, Input } from 'semantic-ui-react';

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




function createData(id, date, name, courseCode,Button) {
     return { id, date, name, courseCode,Button};
   }
 const rows = [
  {
    course : {_id: '643c21d04e2263e1432d773f', name: 'Web Development', courseCode: 'IT313', description: 'MERN Stack', teacher: '642c90413d11be150f573435', 
    },
    instructor: "milind"}
    ,
    {
      course : {_id: '643c21d04e2263e1432d773f', name: 'Android', courseCode: 'IT314', description: 'MEAN', teacher: '642c90413d11be150f573435', 
      },
      instructor: "striker"}
      ,
      {
        course : {_id: '643c21d04e2263e1432d773f', name: 'Python', courseCode: 'IT315', description: 'MERN Stack', teacher: '642c90413d11be150f573435', 
        },
        instructor: "RaOne"}
        , {
          course : {_id: '643c21d04e2263e1432d773f', name: 'Machine learning', courseCode: 'IT316', description: 'MERN Stack', teacher: '642c90413d11be150f573435', 
          },
          instructor: "ChintanSuthar"}
 ]

   
   function preventDefault(event) {
     event.preventDefault();
   }

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
  const [open, setOpen] = React.useState(false);
  const [row,setRows] = React.useState([]);
  const [error,setError] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState('');
  const [filteredResults, setFilteredResults] = React.useState([]);
  const [newRow,setNewRow] = React.useState([]);
  const [ogRow,setOgRow] = React.useState([]);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const [error, setError] = useState(null);
  // const [rows, setRows] = useState([]);
  useEffect(() => {
    if(row.length <= 0){

      axios.get('https://onlinecoursemanagementsystem.onrender.com/user/courses',{headers:{'Authorization': get('token')}})
      .then((resp)=>{   // if no error
        console.log(resp);
        //UNCOMMENT  when BACKEND JOIN
        // setRows(resp.data.data);
        // setNewRow(resp.data.data.course);
        // setOgRow(resp.data.data);
        
        // COMMENT  when BACKEND JOIN 
        setRows(rows);
        setNewRow(rows);
        setOgRow(rows);
      })
      .catch((err)=>{
        console.log(err);
        setError(err.response.data.error);
      })
    }
  },[ogRow]);
  const searchItems = (searchValue) => {
    const len = searchValue.length;
    setSearchInput(searchValue)
    if (len != 0) {
      // const newRow = row.course;
      const filteredData = row.filter((item) => {
        // console.log(Object.values(item.course).join('').toLowerCase())
          return (Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase()) ||
          Object.values(item.course).join('').toLowerCase().includes(searchInput.toLowerCase()))
      })
      
      setFilteredResults(filteredData)
      setOgRow(filteredResults);
  }
  else{
        setFilteredResults(rows)
      setOgRow(rows);
  }
}
  return (
     <>
     <Navbar1/>
     
     
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {/* <AppBar position="absolute" open={open}>
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
          </Toolbar>
        </AppBar> */}
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
        {/* <Box
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
          
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                
                </Paper>
              </Grid>
          
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                 
                </Paper>
              </Grid>
           
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                 
                </Paper>
              </Grid>
            </Grid>
           
          </Container>
        </Box> */}
     
    
    <React.Fragment>
    
      {/* <Title>Classes</Title> */}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Course Code</TableCell>
            <TableCell>Course Name</TableCell>
            <TableCell>Instructor Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Enroll</TableCell>
    
          </TableRow>
        </TableHead>
        <TableBody>
          {ogRow.map((val,idx) => {
          
return (

  <TableRow key={val.course._id}>
              {/* {console.log(val.course.name,val.course.courseCode,val.course.description )} */}
              <TableCell>{val.course.courseCode}</TableCell>
              <TableCell>{val.course.name}</TableCell>
              <TableCell>{val.instructor}</TableCell>
              <TableCell>{val.course.description }</TableCell>
              <TableCell>{ <Button variant="contained">Enroll</Button>}</TableCell>
            </TableRow>
                )
         
})}

        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    
    </React.Fragment>
    </Box>
    <input  placeholder='Search...'
                onChange={(e) => searchItems(e.target.value)}
            />
    </ThemeProvider>

    </>
  );
}

export default function JoinCourse() {
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
  return <DashboardContent setIsLoggedIn={setIsLoggedIn} navigate={navigate} user={state.user} />;
}






