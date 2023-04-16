import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Details</Title>
      <div className="container">
        <Typography component="p" variant="h4">
          Priyanshu09
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          #123456789
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
