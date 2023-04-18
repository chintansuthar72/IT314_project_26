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
    'Distributed Systems',
    'IT-314',
    'B-Tech',
    80,
    '5/2/2023',
  ),
  createData(
    1,
    'Indian Literature',
    'HM-101',
    'B-Tech',
    50,
    'None',
  ),
  createData(2, 'Software Verification', 'IT-559', 'M-Tech',
  50,
  '23/2/2023',),
  createData(
    3,
    'Environmental Studies',
    'SC-402',
    'B-Tech',
    120,
    '7/2/2023',
  ),
  createData(
    4,
    'Embedded Hardware',
    'EL-203',
    'M-Tech',
    40,
    'None',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>My Courses</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell>Course Code</TableCell>
            <TableCell>Batch</TableCell>
            <TableCell>Student Count</TableCell>
            <TableCell>Upcoming Deadlines</TableCell>
            {/* <TableCell>Class link</TableCell>
            <TableCell align="right">number of students</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{`${row.amount}`}</TableCell>
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
