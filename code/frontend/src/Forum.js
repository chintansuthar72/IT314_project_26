import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

function DiscussionForum() {
  const classes = useStyles();
  const [messages, setMessages] = useState([
    { user: 'Alice', text: 'Hi everyone!' },
    { user: 'Bob', text: 'Hello Alice' },
    { user: 'Charlie', text: 'Hey there' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, { user: 'You', text: inputText }]);
    setInputText('');
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <Typography variant="h5" component="h1" gutterBottom>
          Discussion Forum
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
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

export default DiscussionForum;
