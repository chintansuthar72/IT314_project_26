import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    'it',
    'Btech',
    'sir',
    'link',
    100,
  ),
  createData(
    1,
    'hm',
    'Btech',
    'sir',
    'link',
    100,
  ),
  createData(2, 'ct', 'Mtech', 'sir',
  'link',
  100,),
  createData(
    3,
    'sc',
    'Mtech',
    'sir',
    'link',
    100,
  ),
  createData(
    4,
    'el',
    'Btech-Mtech',
    'sir',
    'link',
    100,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Classes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Course Code</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Instructor</TableCell>
            <TableCell>Class link</TableCell>
            <TableCell align="right">number of students</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}
