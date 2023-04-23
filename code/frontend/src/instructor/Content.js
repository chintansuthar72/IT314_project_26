import React, { Component } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';  
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import axios from 'axios';


const theme = createTheme();

export class AddMaterial extends Component {
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  // handlesubmit function
  //   AddMaterial.handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(e);
  // }

  state = {
    uploadPercentage: 0,
    avatar: ''
  }

  
  uploadFile = ({ target: { files } }) =>{
    console.log( files[0] )
    let data = new FormData();
    data.append( 'file', files[0] )

    const options = {
      onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        console.log( `${loaded}kb of ${total}kb | ${percent}%` );

        if( percent < 100 ){
          this.setState({ uploadPercentage: percent })
        }
      }
    }

    axios.post("", data, options).then(res => { 
        console.log(res)
        this.setState({ avatar: res.data.url, uploadPercentage: 100 }, ()=>{
          setTimeout(() => {
            this.setState({ uploadPercentage: 0 })
          }, 1000);
        })
    })
  }

  render() {
    const {uploadPercentage} = this.state;
    return (
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ImportContactsOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Material
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="description"
              label="Description"
              type="description"
              id="description"
            />

      <div className="add - material" >
        
        <div className="content">
          <div className="author">
            <a href="#localhost">
              <Button variant="outlined" noValidate sx={{ mt: 1 }}
              margin="normal"
              fullWidth
              autoFocus>
                <input type="file" className = "item" onChange={this.uploadFile} />
                <h4 className="title">
                  {this.props.name}
                  <small>{this.props.userName}</small>
                </h4>
              </Button>
            </a>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <div className="text-center">{this.props.socials}</div>
      </div>
      <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UPLOAD FILE
            </Button>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
  }
}

export default AddMaterial;