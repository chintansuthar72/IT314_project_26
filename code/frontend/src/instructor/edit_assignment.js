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
import Avatar from '@mui/material/Avatar';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {Alert} from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import GradingIcon from '@mui/icons-material/Grading';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
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
import UpdateGrade from './update_grade';

const theme = createTheme();
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
  // if (Date.now() > item.ttl) {
  //     localStorage.removeItem(keyName);
  //     return null;
  // }
  return item.value;
};

//dummy data
const initialRows = [
  // {
  //   id: randomId(),
  //   name: randomTraderName(),
  //   description : 'This is a description for a Assignment and can be edit or delete',
  //   dateCreated: randomCreatedDate(),
  //   lastupdate: randomUpdatedDate(),
  // },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function EditAssignment({course, created_assignment}) {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [error, setError] = useState(null);
  const [changed,setChanged] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAssignment, setOpenAssignment] = React.useState(false);
  const [error1, setError1] = useState(null);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [formLink,setFormLink] = useState('');
  const [assignmentId,setAssignmentId] = useState('');

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

  const handleDeleteClick = (id) => () => {
    let delete_row = (rows.filter((row) => row.id === id))[0];
    axios.delete(`https://onlinecoursemanagementsystem.onrender.com/assignment/${delete_row._id}`,{headers:{'Authorization':get('token')}})
    .then((resp)=>{   // if no error
      console.log("HandleDelete:\n");
      console.log(resp);
      // setOpen(false);
      setRows(rows.filter((row) => row.id !== id));
      setChanged(!changed);
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response.data.message);
    })
    console.log(delete_row);
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
    axios.put(`https://onlinecoursemanagementsystem.onrender.com/assignment/${updatedRow._id}`,{
      name : updatedRow.name,
      description : updatedRow.description,
      link : updatedRow.link,
      due_date : updatedRow.due_date
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
    // const save_row = rows.filter((row) => row.id === id)[0];
    // console.log(save_row)
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { 
      field: 'name', 
      headerName: 'Title', 
      width: 160, 
      editable: true 
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      width: 300, 
      editable: true 
    },
    { 
      field: 'link', 
      headerName: 'Link',
      width: 130, 
      editable: true,
      renderCell: (params) => {
        const this_link = params.value;
        return <a href={this_link} target="_blank">Assignment</a>;
      },
    },
    {
      field: 'createdAt',
      headerName: 'Date Created',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      width: 150,
      editable: false,
    },
    {
      field: 'due_date',
      headerName: 'Due Date',
      type: 'dateTime',
      valueGetter: ({ value }) => value && new Date(value),
      width: 200,
      editable: true,
    }
  ];
  
  if(get('role') === "TEACHER") {
      columns.push({
        field: 'actions',
        type: 'actions',
        headerName: 'Edit/Delete/Grade',
        width: 150,
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
          const return_array = get('role') == 'TEACHER' ? [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<GradingIcon />}
              label="Grade"
              onClick={() => handleGradeClick(id)}
              color="inherit"
            />,
          ]: [];
          return  return_array
        },
      })
  }

  if(get('role') === "STUDENT") {
    columns.push({
      field: 'grade',
      headerName: 'Grade',
      width: 100,
      editable: false,
    })
    columns.push({
      field: 'graded',
      headerName: 'Graded',
      width: 100,
      editable: false,
    })
  }

  // Added
  useEffect(() => {
    axios.get(`https://onlinecoursemanagementsystem.onrender.com/assignment/course/${course._id}`,{headers:{'Authorization': get('token')}})
    .then((resp)=>{   // if no error
      console.log("UseEffect :\n");
      console.log(resp);
      let data = resp.data.data;
      for(let i = 0; i < data.length; ++i){
        data[i].id = randomId();
      }
      setRows(data);
      console.log(rows);
    })
    .catch((err)=>{
      console.log(err);
      setError(err.response.data.error);
    })

    if(get('role') === "STUDENT") {

    }

  },[changed,created_assignment]);

  const handleGradeClick = (id) => {
    setOpen(true);
    setAssignmentId(rows.filter((row) => row.id === id)[0]._id);
  }

  const handleClose = () => {
    setOpen(false);
    setAssignmentId('');
  };

  const handleSave = () => {

  }

  ///
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
      <CssBaseline/>

    <Box
    sx={{
      marginTop: 10,
      // display: 'flex',
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
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Grades
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
          {error1 ? <Alert severity="error">{error1}</Alert> : ""}
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <UpdateGrade assignmentId={assignmentId}/>
            </Box>
          </Container>
        </ThemeProvider>
      </Dialog>
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