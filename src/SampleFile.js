import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { parse } from "json2csv";
import fileDownload from "js-file-download";
import { Stack, CircularProgress } from '@mui/material';
import ReactiveButton from 'reactive-button';
import e from 'cors';
const cors = require('cors');


const theme = createTheme();

export default function App () { 

    const [state, setState] = useState('idle');
    const [apiKey, setApiKey] = useState("");
    const [tag, setTag] = useState("");
    const [minCreate, setMinCreate] = useState("");
    const [maxCreate, setMaxCreate] = useState("");
    const [page, setPage] = useState("");
    const [slug, setSlug] = useState("");
    const [level, setLevel] = useState("");
  
    
    const fetchData = async (e) => {
      
          const arr = []
          const newres = await axios.get(`https://api.aftership.com/v4/trackings/?tag=${tag}&created_at_min=${minCreate}&created_at_max=${maxCreate}&page=${page}&limit=200&slug=${slug}`, {
          headers: {
            "Content-Type": "application/json",
            "aftership-api-key": `${apiKey}`
          },
        })


        const res = await newres.data.data.trackings
          
          const pageNumber = newres.data.data.count/200
          const exactPage = Math.ceil(pageNumber)
     
          if(pageNumber == 0){
            alert("No data found")
          }
        
          for(let i=1; i<=exactPage; i++) {
       
              let n = await axios.get(`https://api.aftership.com/v4/trackings/?tag=${tag}&created_at_min=${minCreate}&created_at_max=${maxCreate}&page=${i}&limit=200&slug=${slug}`, {
                  headers: {
                    "Content-Type": "application/json",
                    "aftership-api-key": `${apiKey}`
                  },
                  })

              
               
              arr.push(n.data.data.trackings);

             
           if(arr.length == exactPage){
            var merged = [].concat.apply([], arr);

            const onClickHandler = () => {
                setState('loading');
                setTimeout(() => {
                    setState('success');
                }, 2000);
            }
    fileDownload(parse(merged), `${tag}_report.csv`)
           }
      
                }
                
              }
    

  return (
  
    <ThemeProvider theme={theme} >
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://cdn.shopify.com/app-store/listing_images/2b1e15082bfdc3b29c516461be6bd261/banner/COPzh_K59PUCEAE=.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              AfterShip Tracking Export Tool
            </Typography>
        
            <Box component="form" sx={{ mt: 1 }}>
            <label>Please enter the API Key</label>
              <TextField
                margin="normal"
                required
                onChange={(event) => setApiKey(event.target.value)}
                fullWidth
                label="API Key"
              /> <label>Please enter the Status</label>
              <TextField
                margin="normal"
                fullWidth
                required
                label="Status"
                type="text"
                id="text"
                onChange={(event) => setTag(event.target.value)}
              /> <label>Please enter the courier Slug</label>
              <TextField
                margin="normal"
                fullWidth
                required
                label="Courier Name"
                type="text"
                id="slug"
                onChange={(event) => setSlug(event.target.value)}
              /> <label>Please enter the Maximum create date</label>
              <TextField
                margin="normal"
                fullWidth
                required
                type="date"
                id="date"
           
                onChange={(event) => setMinCreate(event.target.value)}
              />
              <label>Please enter the Maximum create date</label>
              <TextField
                margin="normal"
                fullWidth
                required
                type="date"
                id=""
                onChange={(event) => setMaxCreate(event.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                id="form"
                onClick={fetchData}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    
    </ThemeProvider>
 
  );
}