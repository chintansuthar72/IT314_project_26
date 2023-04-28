import React, { useEffect , Component} from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
// import { TextField } from '@mui/material';
import axios from 'axios';
import {Alert} from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Avatar from '@mui/material/Avatar';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Grid';
import EditAssignment from '../instructor/edit_assignment';

const theme = createTheme();


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
  // if (Date.now() > item.ttl) {
  //     localStorage.removeItem(keyName);
  //     return null;
  // }
  return item.value;
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Assignment = ({ course }) => {
    const [error, setError] = useState(null);
    const [rows, setRows] = useState([]);
    const [changed,setChanged] = useState(false);
  

    const [open, setOpen] = React.useState(false);
    const [openAssignment, setOpenAssignment] = React.useState(false);
    const [error1, setError1] = useState(null);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [dueDate,setDueDate] = useState('');
    const [formLink,setFormLink] = useState('');

    useEffect(() => {
      axios.get(`https://onlinecoursemanagementsystem.onrender.com/assignment/course/${course._id}`,{headers:{'Authorization': get('token')}})
      .then((resp)=>{   // if no error
        console.log("UseEffect :\n");
        console.log(resp);
        setTimeout(()=>{
          
        },10)
        setRows(resp.data.data);
        console.log(rows);
      })
      .catch((err)=>{
        console.log(err);
        setError(err.response.data.error);
      })
    },[changed]);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClickOpenAssignment = () => {
      setOpenAssignment(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    const handleCloseAssignment = () => {
      setOpenAssignment(false);
    };

  const handleSaveAssignment = () => {

  }

  const handleSave = () => {
    console.log({
      name : title,
      description : description,
      due_date : dueDate,
      link : formLink
    })
    axios.post(`https://onlinecoursemanagementsystem.onrender.com/assignment/course/${course._id}`,{
      name : title,
      description : description,
      due_date : dueDate,
      link : formLink
    },{headers:{'Authorization':get('token')}})
    .then((resp)=>{   // if no error
      console.log("HandleSave:\n");
      console.log(resp);
      setOpen(false);
      setChanged(!changed);
    })
    .catch((err)=>{
      console.log(err);
      setError1(err.response.data.message.message);
    })
  }
  
  const handleDelete = (id) => {
    axios.delete(`https://onlinecoursemanagementsystem.onrender.com/assignment/${id}`,{headers:{'Authorization':get('token')}})
    .then((resp)=>{   // if no error
      console.log("HandleDelete:\n");
      console.log(resp);
      setOpen(false);
      setChanged(!changed);
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response.data.message);
    })
  }

  return (
    <div className="announcement">
      <>
        {/* <AddAnnouncement course={course} setchanged={setChanged} changed={changed}/> */}
        <div>
        {       
            get('role') == 'TEACHER' ? 
            <div>
            <Button variant="outlined"  onClick={handleClickOpen}>
              Add Assignment
            </Button>
            {error ? <Alert severity="error">{error}</Alert> : ""}
            </div>
            : <></>
        }
          
          <div style={{padding:"10px"}}></div>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  New assignment
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSave}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            {/* <List>
              <ListItem>
                <TextField fullWidth  id="standard-basic" label="Title" variant="filled" onChange={(e) => setTitle(e.target.value)}/>
              </ListItem>
              <Divider />
              <ListItem>
                <TextField fullWidth  id="standard-basic" label="Description" variant="filled" multiline rows={5} onChange={(e)=>setDescription(e.target.value)}/>
              </ListItem>

            </List> */}
              {error1 ? <Alert severity="error">{error1}</Alert> : ""}
            {/* add assignment start */}
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
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
                  <Box noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      autoComplete="title"
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="description"
                      label="Description"
                      type="description"
                      id="description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="dueDate"
                      label="Due Date"
                      type="datetime-local"
                      id="dueDate"
                      onChange={(e) => setDueDate(e.target.value)}
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
                          onChange={(e) => setFormLink(e.target.value)}
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
                      onClick={handleSave}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      UPLOAD ASSIGNMENT
                    </Button>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </Dialog>
        </div>
        <EditAssignment course={course} created_assignment={handleSave}/>
        {/* <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
          {rows.map(announcement => 
            <Item>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={announcement.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {announcement.description}
                      </Typography>
                    </React.Fragment>
                  }
                />
                <Button variant="outlined"  onClick={handleClickOpenAssignment}>
                  Open
                </Button>
                <Dialog
                  fullScreen
                  open={openAssignment}
                  onClose={handleCloseAssignment}
                  TransitionComponent={Transition}
                >
                  <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                      <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleCloseAssignment}
                        aria-label="close"
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        {announcement.name}
                      </Typography>
                      <Button autoFocus color="inherit" onClick={handleSaveAssignment}>
                        save
                      </Button>
                    </Toolbar>
                  </AppBar>
                    {error1 ? <Alert severity="error">{error1}</Alert> : ""}
                  <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
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
                        <Box noValidate sx={{ mt: 1 }}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                          />
                          <TextField
                            margin="normal"
                            fullWidth
                            name="description"
                            label="Description"
                            type="description"
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="dueDate"
                            label="Due Date"
                            type="datetime-local"
                            id="dueDate"
                            onChange={(e) => setDueDate(e.target.value)}
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
                                onChange={(e) => setFormLink(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <ContentPasteOutlinedIcon />
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
                            onClick={handleSave}
                            sx={{ mt: 3, mb: 2 }}
                          >
                            UPLOAD ASSIGNMENT
                          </Button>
                        </Box>
                      </Box>
                    </Container>
                  </ThemeProvider>
                </Dialog>
                <IconButton edge="end" aria-label="delete">
                  <EditIcon />
                </IconButton>
                <Divider orientation="vertical" style={{paddingLeft:"10px",paddingRight:"10px"}}/>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick={() => handleDelete(announcement._id)}/>
                </IconButton>
              </ListItem>
            </Item>
          )}
          </Stack>
        </Box> */}
      </>
    </div>
  );
}

export default Assignment