import * as React from "react";
import '../components/style.css';

import { Grid,Paper, Avatar, TextField, Button,Box, Typography,Link } from '@mui/material'
import ContactPageIcon from '@mui/icons-material/ContactPage';
// import Box from '@material-ui/core/Box';


export const Contact=()=>{

    const paperStyle={padding :50,height:'75vh',width:500, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return <div classname = "outer" >
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous"></link>
	      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          p: 1,
          m: 3,
          pl: 15,
            }}> 
        <Grid >
        <Box sx={{boxShadow: '1px ',m:5,}}>
            <Paper  style={paperStyle} >
                <Grid align='center'>
                     <Avatar style={avatarStyle}><ContactPageIcon/></Avatar>
                    <h2>Contact Us</h2>
                </Grid>
                <TextField label='Full Name' placeholder='Enter Full Name' fullWidth required margin="normal"/>
                 <TextField label='Email Address' placeholder='Enter email ID' fullWidth required margin="normal"/>
                 <TextField label='Subject' placeholder='Enter Subject' fullWidth required margin="normal"/>
                <TextField label='Message' placeholder='Enter Message'  fullWidth required margin="normal"/>
                
                
                 
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Send Message</Button>
                
            </Paper>
            
        </Box>
        </Grid>
            <Box sx={{m:5, p:1,pl: 10,justifyContent: 'center',}}>
            <img src="../../contact.webp" alt="Contact-Us Logo" width="400" height= "400"/>
            </Box>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          p: 1,
          m: 1,
          borderRadius: 5,
          
          // justifyContent: 'center',
          justifyContent: 'space-between',
        }}>
              <i class="fa fa-thumb-tack"> NIT Calicut, Kattangal, Kozhikode 673601 &ensp;</i> 
              <i class="fa fa-phone">+91-495-2286144 &ensp;</i> 
              <i class="fa fa-envelope">info@cms.nitc.ac.in &ensp;</i> 
              <i class="fa fa-globe"><em> Website link </em> </i> 

{/*         
        <ul class="social" sx={{justifyContent: 'space-evenly'}}>
              <li><i class="fa fa-thumb-tack"> NIT Calicut, Kattangal, Kozhikode 673601 &ensp;</i></li>
              <li><i class="fa fa-phone"> +91-495-2286144 &ensp;</i></li>
              <li><i class="fa fa-envelope"> info@cms.nitc.ac.in &ensp;</i> </li>
              <li><i class="fa fa-globe"> <em> Website link </em></i></li>
            </ul> */}
        </Box>
        
        </div>;
        
    
};

