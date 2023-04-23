import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import {
  Container,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography
} from '@mui/material';

const useStyles = styled((theme) => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  form: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  input: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  list: {
    marginBottom: theme.spacing(2),
  },
}));

function Chat() {
  const classes = useStyles();
  const [messages, setMessages] = useState([
    { user: 'Alice', text: 'Hi everyone!' },
    { user: 'Bob', text: 'Hello Alice' },
    { user: 'Charlie', text: 'Hey there' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([ { user: 'You', text: inputText } ,...messages]);
    setInputText('');
  };

  return (
    <Container maxWidth="sm" >
      <Paper className={classes.root} >
        <form onSubmit={handleSubmit} className={classes.form} style={{display:"flex"}}>
            <div >
              <TextField
                label="Message"
                variant="outlined"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={classes.input}
              />
              <Button variant="contained" color="primary" type="submit">
                Send
              </Button>
            </ div>
        </form>
        <List className={classes.list}>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>{message.user.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={message.user}
                secondary={message.text}
              />
            </ListItem>
          ))}
        </List>
        
      </Paper>
    </Container>
  );
}

export default Chat;
