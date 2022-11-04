import React, { useState } from 'react'
import { Grid, TextField, Button, Card, CardContent } from '@mui/material'

import LockIcon from '@mui/icons-material/Lock';
export const AssignWorker=({handleChange})=>{

    const btnstyle={margin:'8px 0'}
    return(
            <Card style={{margin:"0 auto", border:"solid 1px"}}>
                <CardContent>
                    <Grid align="center">
                        <h2>Assign Worker</h2>
                    </Grid>
                    <form>
                    <Grid container spacing={1}>
                        <Grid xs={12} s={6} item>
                            <TextField fullWidth label="Worker Name" placeholder="Enter worker name" variant="outlined" required></TextField>
                        </Grid>
                        <Grid xs={12} s={6} item>
                            <TextField type ="number" fullWidth label="Contact No" placeholder="Enter contact no" variant="outlined" required></TextField>
                        </Grid>
                        <Grid xs={12} s={6} item>
                            <TextField fullWidth label="Remarks" multiline rows="5" placeholder="Enter any remarks" variant="outlined"></TextField>
                        </Grid>
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Submit</Button>

                    </Grid>
                </form>

                </CardContent>
            </Card>
        
    )
}