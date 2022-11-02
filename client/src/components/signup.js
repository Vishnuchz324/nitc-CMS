import React from 'react'
import { Grid, Paper,MenuItem,InputLabel, Avatar, Typography, TextField, Button,Checkbox ,FormControlLabel,FormControl,FormLabel,RadioGroup,Radio,Select, SelectChangeEvent} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import Checkbox from '@material-ui/core/Checkbox';
const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const [dept,setdept] = React.useState('');

    const handleChange = event => {
        setdept(event.target.value);
      };


    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form>
                    <TextField fullWidth label='Name' placeholder="Enter your name" />
                    <TextField fullWidth label='Email' placeholder="Enter your email" />
                    <TextField fullWidth label='RollNo' placeholder="Enter your roll number" />
                    {/* <FormControl component="fieldset" style={marginTop}>
                        <FormLabel component="legend">Department</FormLabel>
                        <RadioGroup aria-label="department" name="department" style={{ display: 'initial' }}>
                            <FormControlLabel value="cse" control={<Radio />} label="CSE" />
                            <FormControlLabel value="ece" control={<Radio />} label="ECE" />
                            <FormControlLabel value="eee" control={<Radio />} label="EEE" />
                            <FormControlLabel value="mech" control={<Radio />} label="MECH" />
                            <FormControlLabel value="civil" control={<Radio />} label="CIVIL" />
                            
                        </RadioGroup>
                    </FormControl> */}

                     <FormControl sx={{ m: 1, minWidth: 150 }} >
                    <InputLabel id="department">Department</InputLabel>
                    <Select
                    labelId="departmeent"
                    id="department"
                    value={dept}
                    label="Department"
                    onChange={handleChange}
                     >
                    <MenuItem value="Department">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={"cse"}>CSE</MenuItem>
                    <MenuItem value={"ece"}>ECE</MenuItem>
                    <MenuItem value={"eee"}>EEE</MenuItem>
                    <MenuItem value={"mech"}>MECH</MenuItem>
                    <MenuItem value={"civil"}>CIVIL</MenuItem>
                </Select>
                </FormControl>

                    <TextField fullWidth label='Phone Number' placeholder="Enter your phone number" />
                    <TextField fullWidth label='Password' placeholder="Enter your password"/>
                    <TextField fullWidth label='Confirm Password' placeholder="Confirm your password"/>
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
                    />
                    <Button type='submit' variant='contained' color='primary'>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;