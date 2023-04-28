import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
// import { format } from 'date-fns'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import './feedback.css';  // import the CSS file
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
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


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function RecipeReviewCard({feedback}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={feedback.topic}
        subheader={Date(feedback.createdAt).split(' ').slice(1, 4).join(' ')}
      />
      {
        !expanded ? 
        <CardContent>
          <Typography variant="body2" color="text.secondary" >
            {
              feedback.description.slice(0, 200)
            }...
          </Typography>
        </CardContent> : ""
      }
      
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {feedback.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}


function InstructorFeedback({course}) {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  React.useEffect(() => {
    if(get('role') === 'TEACHER') {
      axios.get(`https://onlinecoursemanagementsystem.onrender.com/feedback/course/${course._id}`,{ headers: { 'Authorization': get('token') } })
      .then(res => {
          console.log(res.data.data);
          setFeedbacks(res.data.data);
        }
      )
      .catch(err => {
          console.log(err.response.data);
          setError(err.response.data.message);
        }
      )
    }
  }
  ,[])

  const handleSubmit = () => {
    axios.post(`https://onlinecoursemanagementsystem.onrender.com/feedback/course/${course._id}`, {
      topic: topic,
      description: description,
    }, { headers: { 'Authorization': get('token') } })
    .then(res => {
        setError('Feedback added successfully');
      }
    )
    .catch(err => {
        console.log(err.response.data);
        setError(err.response.data);
      }
    )

  }

  if(get('role') === 'TEACHER') {
    return (
      <Box sx={{ flexGrow: 1 }}>
        {feedbacks.length > 0 ? (
          <Grid container spacing={1}>
            {feedbacks.map(feedback => (
              <Grid item md={3}>
                <RecipeReviewCard feedback={feedback}/>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" align="center">No Feedback Available</Typography>
        )}
      </Box>
    );
  }


  return(
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h3" variant="h5">
          {error}
      </Typography>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <RateReviewOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Feedback form
      </Typography>
      <Box noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="topic"
          label="Topic"
          autoFocus
          onChange={(e) => setTopic(e.target.value)}
        />
        <TextField
          id="outlined-multiline-static"
          margin="multiline"
          multiline
          rows={5}
          required
          fullWidth
          name="description"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default InstructorFeedback;