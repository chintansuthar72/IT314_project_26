import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';

const theme = createTheme();
const steps = [
  {
    label: 'Enter Your Email Address',
    description: `Ensure that your email address is valid`,
              
  },
  {
    label: 'Enter OTP',
    description:
      'We have sent you OTP on your email',
  },
  {
    label: 'Enter New Password',
    description: `Please Remember Your Password and Keep it Safe`,
  },
];

export default function ForgotPassword() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [email, setEmail] = React.useState('');
  const [otp, setOTP] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const hadnleEmailSubmit = async () => {
    axios.get(`https://onlinecoursemanagementsystem.onrender.com/user/change/generateToken?email=${email}`)
    .then((res) => {
        console.log(res.data)
        if(res.data === "password reset OTP sent to your email account") {
            handleNext()
        } else if(res.data === "Unable to send OTP to your email account"){
            setError(res.data)
        }
    }).catch((err) => {
        console.log(err)
        setError(err.response.data.error)
    })
  }

  const handleOTPSubmit = async () => {
    handleNext()
  }

  const handlePasswordSubmit = async () => {
    axios.get(`https://onlinecoursemanagementsystem.onrender.com/user/change/resetPassword?email=${email}&token=${otp}&password=${password}`)
    .then((res) => {
        console.log(res.data)
        handleNext()
        setError(null)
    }).catch((err) => {
        console.log(err)
        setError(err.response.data.error)
    })
  }

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
          <Box component = "form" sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <PasswordIcon />
        </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
                {
                    index==0?<TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                  />:<></>
                }
                {
                    index==1?<TextField
                    margin="normal"
                    required
                    fullWidth
                    id="otp"
                    label="One Time Password"
                    name="otp"
                    autoComplete="number"
                    autoFocus
                    onChange={(e) => setOTP(e.target.value)}
                  />:<></>
                }
                {
                    index==2?<TextField
                    required
                    fullWidth
                    name="password"
                    label="New Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />:<></>
                }
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={
                      index==0?hadnleEmailSubmit: index==1 ? handleOTPSubmit : handlePasswordSubmit
                    }
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate('/')} >
            Go to Sign in 
          </Button>
          
        </Paper>
      )}
    </Box>
    </Container>
    </ThemeProvider>
  );
}