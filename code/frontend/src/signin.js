import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="./home">
        Online Course Managment System
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
      return null;
  }
  return item.value;
};

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token') !== null);

  React.useEffect(() => {
    if(get('token') !== null){
      // navigate('/dashboard');
    }
  }, [isLoggedIn]);

  const [error, setError] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const signinData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    axios.post('/user/login',signinData)
    .then((resp)=>{   // if no error
      console.log(resp);
      // add token from response header to local storage
      set('token',resp.data.data.token,100000);
      set('role',resp.data.data.user.role,100000);
      set('user',resp.data.data.user.username,100000);
      // setIsLoggedIn(true);
      navigate('/dashboard', {
        state: {
          user : resp.data.data,
        }
      });
    })
    .catch((err)=>{
      setError(err.response.data.error);
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography component="h3" variant="h5">
               {error}
            </Typography>
            <Grid container >
              <Grid item xs container justifyContent={'flex-end'}>
                <ButtonBase 
                  style={{
                    color: 'red',
                    // textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate("/")}>{"Forgot Password?"}</ButtonBase>
              </Grid>
              <Grid item container justifyContent={'flex-end'}>
                <ButtonBase 
                  sx={{mt: 1, mb: 1}}
                  style={{
                    color: 'blue',
                    // textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate("/signup")}>{"Don't have an account? Sign Up"}</ButtonBase>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}