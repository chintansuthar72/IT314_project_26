import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import axios from 'axios';
import { Alert } from '@mui/material';

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
  if (Date.now() > item.ttl) {
      localStorage.removeItem(keyName);
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      return null;
  }
  return item.value;
};

export default function EnrolledStudentList({course}) {

  console.log(course);
  const [rows, setRows] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    axios.get('https://onlinecoursemanagementsystem.onrender.com/course/user/' + course._id,
        {headers:{'Authorization': get('token')}})
      .then(response => {
        console.log(response.data.data);
        setRows(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.response.data);
        console.log(error);
      })
  }, []);

  const onDelete = (id) => {
    axios.delete('https://onlinecoursemanagementsystem.onrender.com/course/user/'+ id + '?courseId=' + course._id,{headers:{'Authorization': get('token')}})
      .then(response => {
        setRows(rows.filter(student => student._id !== id));
      })
      .catch(error => {
        setError(error.response.data);
        console.log(error);
      })
  }

  return (
    <TableContainer component={Paper}>
      {error ? <Alert severity="error">{error}</Alert> : "" }
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'><b>Name</b></TableCell>
            {
              get('role') === 'TEACHER' ?
              <> 
              <TableCell align="center"><b>Email</b></TableCell>
              <TableCell align="center"><b>Phone</b></TableCell>
              <TableCell align="center"><b>Remove</b></TableCell>
              </> : ""
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
                {row.username}
              </TableCell>
              {
                get('role') === 'TEACHER' ?
                <> 
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.phone}</TableCell>
                <TableCell align="center">
                  <Button 
                  color="error"
                  onClick={() => onDelete(row._id)}>Remove</Button>
                </TableCell>
                </> : ""
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}