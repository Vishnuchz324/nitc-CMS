import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Button, Box, Grid, TextField, Card, CardContent } from '@mui/material'

import LockIcon from '@mui/icons-material/Lock';
export const Validate =({handleChange})=>{

    const btnstyle={margin:'8px 0'}
    return(
            <Card style={{margin:"0 auto"}}>
                <CardContent>
                    <Grid align="center">
                        <h2>Validate Complaint</h2>
                    </Grid>
                    
                    <Box sx={{ minWidth: 120 }}>
                        <div>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Select Validity</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  //value={validity}
                                  onChange={handleChange}
                                >
        
          
                                   <MenuItem value={"Valid"}>Valid</MenuItem>
                                   <MenuItem value={"InValid"}>InValid</MenuItem>
                                   <MenuItem value={"ON HOLD"}>On Hold</MenuItem>
                                </Select>
                        </FormControl>
                        
                        </div>
                       
                        
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <TextField fullWidth id="filled-basic" label="Update Status" variant="filled" />
                    </Box>


                    <Box sx={{ minWidth: 120 }}>
                        <div>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Forward to</InputLabel>
                                <Select
                                  labelId="demo-simple-select-filled-label"
                                  id="demo-simple-select-filled"
                                  //value={validity}
                                  onChange={handleChange}
                                >
        
          
                                   <MenuItem value={"HoD"}>Head of Department</MenuItem>
                                   <MenuItem value={"Administration office"}>Administration Office</MenuItem>
                                   <MenuItem value={"SAC"}>Student Affairs Council</MenuItem>
                                </Select>
                        </FormControl>
                        </div>
                    </Box>
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth> Validate</Button>
                  

                </CardContent>
            </Card>
        
    )
}



