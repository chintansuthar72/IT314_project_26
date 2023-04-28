import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import {Alert} from '@mui/material';

import Avatar from '@mui/material/Avatar';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  GridRowModes,
  DataGridPro,
  GridToolbarContainer,
  GridActionsCellItem,
} from '@mui/x-data-grid-pro';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId,
} from '@mui/x-data-grid-generator';
import Container from '@mui/material/Container';
import axios from 'axios'
import { useEffect } from 'react';

const theme = createTheme();

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
      return null;
  }
  return item.value;
};

//dummy data
const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    lastupdate: randomUpdatedDate(),
    maxscore : (Math.floor(Math.random() * 10))*10,
    grade : 0,
    feedback : "Add Comments",
  },
  {
    id: randomId(),
    name: randomTraderName(),
    lastupdate: randomUpdatedDate(),
    maxscore : (Math.floor(Math.random() * 10))*10,
    grade : 0,
    feedback : "Add Comments",
  },
  {
    id: randomId(),
    name: randomTraderName(),
    lastupdate: randomUpdatedDate(),
    maxscore : (Math.floor(Math.random() * 10))*10,
    grade : 0,
    feedback : "Add Comments",
  },
  {
    id: randomId(),
    name: randomTraderName(),
    lastupdate: randomUpdatedDate(),
    maxscore : (Math.floor(Math.random() * 10))*10,
    grade : 0,
    feedback : "Add Comments",
  },
  {
    id: randomId(),
    name: randomTraderName(),
    lastupdate: randomUpdatedDate(),
    maxscore : (Math.floor(Math.random() * 10))*10,
    grade : 0,
    feedback : "Add Comments",
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function UpdateGrade({assignmentId}) {
  // const [rows, setRows] = React.useState(initialRows);
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [error,setError] = React.useState('');

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    console.log(updatedRow)
    axios.put(`https://onlinecoursemanagementsystem.onrender.com/submission/grade/${updatedRow.id}`,{
      grade : updatedRow.grade,
      feedback : updatedRow.feedback,
    },{headers:{'Authorization':get('token')}})
    .then((resp)=>{   // if no error
      console.log("HandleEdit:\n");
      console.log(resp);
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      // setOpen(false);
      // setChanged(!changed);
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response.data.message);
    })
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  useEffect(() => {
    axios.get(`https://onlinecoursemanagementsystem.onrender.com/submission/assignment/${assignmentId}`,{headers:{'Authorization': get('token')}})
    .then((resp)=>{   // if no error
      console.log("UseEffect :\n");
      console.log(resp);
      let data = resp.data.data;
      let newData = [];
      for(let i = 0; i < data.length; ++i){
        newData.push({
          id : data[i]._id,
          name : data[i].studentName,
          updatedAt : data[i].updatedAt,
          maxscore : 100,
          grade : data[i].grade,
          feedback : data[i].feedback,
        })
      }
      setRows(newData);
      console.log(rows);
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response.data.error);
    })
  },[]);

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 150, 
      editable: false 
    },
    {
      field: 'updatedAt',
      headerName: 'Last Modified',
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      width: 180,
      editable: false,
    },
    {
        field: 'maxscore',
        headerName: 'Max Score',
        width: 80,
        editable: false,  
    },
    {
        field: 'grade',
        headerName: 'Grade',
        type:'number',
        width: 100,
        editable: true,
        valueGetter: (params) => {
          const { row } = params;
          const grade = row.grade !== undefined ? parseInt(row.grade, 10) : null;
          const maxscore = row.maxscore !== undefined ? parseInt(row.maxscore, 10) : null;
          if (grade === null || maxscore === null || isNaN(grade) || isNaN(maxscore)) {
            return '';
          }
          return Math.min(Math.max(0, grade), maxscore);
        },
      },
    {
        field: 'feedback',
        headerName: 'Feedback',
        width: 300,
        editable: true,  
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Edit',
      width: 50,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
        //   <GridActionsCellItem
        //     icon={<DeleteIcon />}
        //     label="Delete"
        //     onClick={handleDeleteClick(id)}
        //     color="inherit"
        //   />,
        ];
      },
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
      <CssBaseline/>
      {error ? <Alert severity="error">{error}</Alert> : ""}

    <Box
    sx={{
      marginTop: 10,
      display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
    }}
    >
      <DataGridPro
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
    </Container>
    </ThemeProvider>
  );
}