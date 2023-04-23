import React, { Component } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const theme = createTheme();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export class CreateAssignment extends Component {
  

  render() {
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
            <AssignmentOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Assignment
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              type="description"
              id="description"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="dueDate"
              label="Due Date"
              type="datetime-local"
              id="dueDate"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                  <Button fullWidth
                    variant="outlined"
                    sx={{ mt: 2, mb: 2 }} 
                    href="https://docs.google.com/forms/"
                    target="_blank"
                    rel="noreferrer"
                  >
                        Open Google Form
                  </Button>
                </Grid>
                <Grid item xs={8}>
                <TextField
                  margin="normal"
                  fullWidth
                  required
                  className="item"
                  name="assignment-link"
                  label="Paste Assignment Link Here"
                  type="assignment-link"
                  id="assignment-link"
                  InputProps={{
                      startAdornment: (
                      //   <InputAdornment position="start">
                          <ContentPasteOutlinedIcon />
                      //   </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UPLOAD ASSIGNMENT
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
  }
}

export default CreateAssignment;