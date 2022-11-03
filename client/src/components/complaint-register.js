import React, { useState } from 'react'
import { Grid, TextField, Button, Card, CardContent } from '@mui/material'

import LockIcon from '@mui/icons-material/Lock';
export const Complaint=({handleChange})=>{

    const btnstyle={margin:'8px 0'}
    return(
            <Card style={{margin:"0 auto"}}>
                <CardContent>
                    <Grid align="center">
                        <h2>Register Complaint</h2>
                    </Grid>
                    <form>
                    <Grid container spacing={1}>
                        <Grid xs={12} s={6} item>
                            <TextField fullWidth label="Title" placeholder="Enter title of the complaint" variant="outlined" required></TextField>
                        </Grid>
                        <Grid xs={12} s={6} item>
                            <TextField fullWidth label="Description" multiline rows="5" placeholder="Enter description of the complaint" variant="outlined" required></TextField>
                        </Grid>
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Register</Button>

                    </Grid>
                </form>

                </CardContent>
            </Card>
        
    )
}


    