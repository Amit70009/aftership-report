import axios from "axios";
import React, { useEffect, useState } from "react";
import { parse } from "json2csv";
import FileDownload from "js-file-download";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../src/App.css';
import fileDownload from "js-file-download";
const cors = require('cors');



function App () { 
  const [user, setUser] = useState([]); 
  const [apiKey, setApiKey] = useState("");
  const [tag, setTag] = useState("");
  const [minCreate, setMinCreate] = useState("");
  const [maxCreate, setMaxCreate] = useState("");
  const [page, setPage] = useState(null);
  const [slug, setSlug] = useState(null);
 

  const fetchData = async (e) => {
    
        const arr = []
        const newres = await axios.get(`https://api.aftership.com/v4/trackings/?tag=${tag}&created_at_min=${minCreate}&created_at_max=${maxCreate}&page=${page}&limit=200`, {
        headers: {
          "Content-Type": "application/json",
          "aftership-api-key": `${apiKey}`
        },
       /*  responseType: "blob" */
      })
      const res = await newres.data.data.trackings
  
        
        const pageNumber = newres.data.data.count/200;
        const exactPage = Math.ceil(pageNumber);
        if(pageNumber == 0){
          alert("No data found")
        }
      
        for(let i=1; i<=exactPage; i++) {
        var newarr = []
            let n = await axios.get(`https://api.aftership.com/v4/trackings/?tag=${tag}&created_at_min=${minCreate}&created_at_max=${maxCreate}&page=${i}&limit=200&slug=${slug}`, {
                headers: {
                  "Content-Type": "application/json",
                  "aftership-api-key": `${apiKey}`
                },
                })
            arr.push(n.data.data.trackings)
            console.log(arr);
         if(arr.length == exactPage){
         /*  var merged = [].concat.apply([], arr); */

        /*   fileDownload(parse(merged), `${tag}_report.csv`) */
         }
    
              }
              
            }
        


  return (
    <div className="body">
    <main>
      <h1 className="header">AfterShip account tracking number Download Tool</h1>
      <div className="left">
      <label> Please enter your API key </label>
      <Box
                sx={{
                    width: 500,
                   
                }}
                >
            <div className="main"><TextField required fullWidth label="API KEY" id="fullWidth" onChange={(event) => setApiKey(event.target.value)} /></div>
            <label>Please enter the status</label>
            <div className="main"><TextField required fullWidth label="API KEY" id="fullWidth" onChange={(event) => setSlug(event.target.value)} /></div>
            <label>Please enter the status</label>
            <div className="main"><TextField required fullWidth label="Status" type={"text"} id="fullWidth" onChange={(event) => setTag(event.target.value)} /> </div>
            <label className="main">Please enter the Min create date</label>
            <div className="main"><TextField required className="main" fullWidth type={"date"} id="fullWidth" onChange={(event) => setMinCreate(event.target.value)} /></div>
            <label className="main">Please enter the Max create date</label>
            <div className="main"><TextField required className="main" fullWidth type={"date"} id="fullWidth" onChange={(event) => setMaxCreate(event.target.value)} /></div>
            </Box>
    <button className="button" onClick={fetchData}> Download file </button>
    </div>
    
    </main>
    </div>
  );

}

export default App;