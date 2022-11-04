import React  from 'react'
import { Grid, TextField, Button, Box, Typography, Card, CardContent } from '@mui/material'
import { Modal } from '@mui/material';

export const Edit=({handleChange})=>{

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style={backgroundColor:"white", padding: 5, width: 800, margin: "0 auto", transform:"translateY(-50%)", top:"50%" , position:"relative"}
    const btnstyle={margin:'8px 0'}
    let CompalintTitle = "Theft of Laptops";
    return(
        <div>
        <Button onClick={handleOpen}>Edit Complaint</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            
            <Card style={{margin:"0 auto", border:"solid 1px"}}>
                <CardContent>
                    <Grid align="center">
                        <h2>Edit Complaint</h2>
                    </Grid>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Title: {CompalintTitle}
                        </Typography>
                    <form>
                    <Grid container spacing={1}>
                        <Grid xs={12} s={6} item>
                            <TextField fullWidth InputLabelProps={{shrink:true}} label="Description" multiline rows="5" placeholder="Edit description of the complaint. Duis mollis, est non commodo luctus, nisi erat porttitor ligula." variant="outlined" required></TextField>
                        </Grid>
                        <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Submit</Button>

                    </Grid>
                </form>

                </CardContent>
            </Card>
          </Box>
          
        </Modal>
        </div>
        
    )
}
