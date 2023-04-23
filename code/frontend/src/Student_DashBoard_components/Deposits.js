import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits({user}) {
  return (
    <React.Fragment>
      <Title>Details</Title>
      <div className="container">
        <Typography component="p" variant="h4">
          {user.user.username}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {user.user.phone}
        </Typography>
      </div>
      {/* <h3>Name</h3>
      <h5>Phone</h5> */}
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
      <div>
        <div className="container mx-1 my-4"> 
            <img src={require('./unnamed.png')} />
        </div>
      </div>
    </React.Fragment>
  );
}
