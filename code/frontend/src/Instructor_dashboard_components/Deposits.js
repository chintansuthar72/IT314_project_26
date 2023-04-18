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
      <Title>Instructor Profile details</Title>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        User ID
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Phone number
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Qualification
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Office number
      </Typography>
    </React.Fragment>
  );
}
