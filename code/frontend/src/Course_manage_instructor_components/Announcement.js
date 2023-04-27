import React, { useEffect } from 'react'
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
import { TextField } from '@mui/material';
import axios from 'axios';
import {Alert} from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CommentIcon from '@mui/icons-material/Comment';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Avatar from '@mui/material/Avatar';

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

const Announcement = ({course }) => {
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [changed,setChanged] = useState(false);


  const [open, setOpen] = React.useState(false);
  const [error1, setError1] = useState(null);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  
  const [openEdit, setOpenEdit] = React.useState(false);
  const [announcementEdit, setAnnouncementEdit] = useState({});

  const [openComment, setOpenComment] = React.useState(false);
  const [announcementId,setAnnouncementId] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`https://onlinecoursemanagementsystem.onrender.com/announcement/course/${course._id}`,{headers:{'Authorization': get('token')}})
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenComment = async (id) => {
    setAnnouncementId(id);
    axios.get(`https://onlinecoursemanagementsystem.onrender.com/comment/announcement/${id}`,{headers:{'Authorization':get('token')}})
      .then((resp)=>{   // if no error
        console.log("HandleClickOpenComment :\n");
        console.log(resp);
        setComments(resp.data.data.sort((a,b)=>{
          if(Date.parse(a.createdAt) < Date.parse(b.createdAt)) return 1;
          return -1;
        }));
        setOpenComment(true);
      })
      .catch((err)=>{
        console.log(err);
        setError(err.response.data.error);
      })
  };

  const handleCloseComment = () => {
    setComments([]);
    setComment('');
    setAnnouncementId(null);
    setOpenComment(false);
  };
  const handleOpenEdit = (announcement) => {
    console.log(announcement);
    setAnnouncementEdit(announcement);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setAnnouncementEdit({});
    setTitle('');
    setDescription('');
    setOpenEdit(false);
  };

  const handleEditAnnouncementSave = async () => {
    axios.put(`https://onlinecoursemanagementsystem.onrender.com/announcement/${announcementEdit._id}`,{
      title : title,
      description : description,
    },{headers:{'Authorization':get('token')}})
    .then((resp)=>{   // if no error
      console.log("HandleSaveEditAnnouncement:\n");
      console.log(resp);
      handleCloseEdit();
      setChanged(!changed);
    })
    .catch((err)=>{
      console.log(err);
      setError1(err.response.data.message.message);
    })
  }

  const handleClickOpenEdit = async (id) => {
    setAnnouncementId(id);
    axios.get(`https://onlinecoursemanagementsystem.onrender.com/comment/announcement/${id}`,{headers:{'Authorization':get('token')}})
      .then((resp)=>{   // if no error
        console.log("HandleClickOpenComment :\n");
        console.log(resp);
        setComments(resp.data.data);
        setOpenComment(true);
      })
      .catch((err)=>{
        console.log(err);
        setError(err.response.data.error);
      })
  };

  const handleSave = () => {
    axios.post(`https://onlinecoursemanagementsystem.onrender.com/announcement/course/${course._id}`,{
      title : title,
      description : description,
      files : [],
      comments : []
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
    axios.delete(`https://onlinecoursemanagementsystem.onrender.com/announcement/${id}`,{headers:{'Authorization':get('token')}})
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

  const handleCommentSubmit = async () => {
    console.log("handleCommentSubmit");
    console.log(announcementId);
    console.log(comment);
    axios.post(`https://onlinecoursemanagementsystem.onrender.com/comment/announcement/${announcementId}`,{
      description : comment,
    },{headers:{'Authorization':get('token')}})
    .then(async (resp)=>{   // if no error
      console.log("HandleCommentSubmit:\n");
      console.log(resp);
      setComment('');
      handleCloseComment();
      // await handleClickOpenComment(announcementId);
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
          <Button variant="outlined"  onClick={handleClickOpen}>
            Add announcement
          </Button>
          : <></>
        }
         
          {error ? <Alert severity="error">{error}</Alert> : ""}
          <div style={{padding:"10px"}}></div>
          <Dialog
            fullScreen
            open={openComment}
            onClose={handleCloseComment}
            TransitionComponent={Transition}
           >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseComment}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Comments
                </Typography>
                {/* <Button autoFocus color="inherit" onClick={handleClose}>
                  save
                </Button> */}
              </Toolbar>
            </AppBar>
              <List>
              <Box
                sx={{
                  width: 1800,
                  paddingLeft: 5,
                  paddingTop: 3,
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <TextField fullWidth label="Add comment" id="fullWidth" onChange={(e) => setComment(e.target.value)}/>
                <Button style={{marginLeft:10}} onClick={handleCommentSubmit}> 
                  <SendRoundedIcon fontSize='large' />
                </Button>
              </Box>
              </List>
              {/* <List> */}
                {comments.map(comment => 
                <Item>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={comment.commentatorName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.description}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider />
                </Item>
              )}
              {/* </List> */}
          </Dialog>

{/* edit title description start */}

      <Dialog
            fullScreen
            open={openEdit}
            onClose={handleCloseEdit}
            TransitionComponent={Transition}
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
                  Edit announcement
                </Typography>
                {/* <Button autoFocus color="inherit" onClick={handleSaveEdit}> */}
                <Button autoFocus color="inherit" onClick={handleEditAnnouncementSave}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <List>
              <ListItem>
                <TextField fullWidth  id="standard-basic" label="Title" variant="filled" defaultValue={announcementEdit.title} onChange={(e) => setTitle(e.target.value)}/>
              </ListItem>
              <Divider />
              <ListItem>
                <TextField fullWidth  id="standard-basic" label="Description" variant="filled" multiline rows={5} defaultValue={announcementEdit.description} onChange={(e)=>setDescription(e.target.value)}/>
              </ListItem>
              {error1 ? <Alert severity="error">{error1}</Alert> : ""}

            </List>
          </Dialog>
{/* edit title description end */}

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
                  New announcement
                </Typography>
                <Button autoFocus color="inherit" onClick={handleSave}>
                  save
                </Button>
              </Toolbar>
            </AppBar>
            <List>
              <ListItem>
                <TextField fullWidth  id="standard-basic" label="Title" variant="filled" onChange={(e) => setTitle(e.target.value)}/>
              </ListItem>
              <Divider />
              <ListItem>
                <TextField fullWidth  id="standard-basic" label="Description" variant="filled" multiline rows={5} onChange={(e)=>setDescription(e.target.value)}/>
              </ListItem>
              {error1 ? <Alert severity="error">{error1}</Alert> : ""}

            </List>
          </Dialog>
        </div>
        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
          {rows.map(announcement => 
            <Item>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={announcement.title}
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
                <IconButton edge="end" aria-label="delete">
                  <CommentIcon onClick={() => handleClickOpenComment(announcement._id)}/>
                </IconButton>
                <Divider orientation="vertical" style={{paddingLeft:"5px",paddingRight:"5px"}}/>
                {
                  get('role') == 'TEACHER' ? 
                  <IconButton edge="end" aria-label="delete">
                  <EditIcon onClick={() => handleOpenEdit(announcement)}/>
                </IconButton> : <></>
                }
                <Divider orientation="vertical" style={{paddingLeft:"5px",paddingRight:"5px"}}/>
                {
                  get('role') == 'TEACHER' ? 
                  <IconButton edge="end" aria-label="delete">
                  <DeleteIcon onClick={() => handleDelete(announcement._id)}/>
                </IconButton> : <></>
                }
              </ListItem>
            </Item>
          )}
          </Stack>
        </Box>
      </>
    </div>
  );
}

export default Announcement