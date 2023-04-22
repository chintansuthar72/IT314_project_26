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

const theme = createTheme();


//dummy data
const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    description : 'This is a description for a Assignment and can be edit or delete',
    dateCreated: randomCreatedDate(),
    lastupdate: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    description : 'This is a description for a Assignment',
    dateCreated: randomCreatedDate(),
    lastupdate: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    description : 'This is a description for a Assignment',
    dateCreated: randomCreatedDate(),
    lastupdate: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    description : 'This is a description for a Assignment',
    dateCreated: randomCreatedDate(),
    lastupdate: randomUpdatedDate(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    description : 'This is a description for a Assignment',
    dateCreated: randomCreatedDate(),
    lastupdate: randomUpdatedDate(),
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function EditAssignment() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

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
    setRows(rows.filter((row) => row.id !== id));
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
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { 
      field: 'name', 
      headerName: 'Title', 
      width: 200, 
      editable: true 
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      width: 420, 
      editable: true 
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 150,
      editable: false,
    },
    {
      field: 'lastupdate',
      headerName: 'Due Date',
      type: 'dateTime',
      width: 200,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Edit/Delete',
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

        return [
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
        ];
      },
    },
  ];

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
      
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' , margin : "auto"}} >
          <EditOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Edit Assignment
    </Typography>
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