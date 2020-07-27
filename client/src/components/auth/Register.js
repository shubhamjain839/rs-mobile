import React,{ useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { registerUser } from '../../actions/auth'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to='#' href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = ({registerUser}) => {
    const [RegisterData, setRegisterData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPass:'',
        contact:'',
        zipcode:'',
        address:'',
        city:'',
        state:'',
        shopname:'',
        country:'',
    })
    
    const {name,email,password,confirmPass,country,address,city,state,shopname,contact,zipcode} = RegisterData
    const onChange = (e) => setRegisterData({
        ...RegisterData,[e.target.name]:e.target.value
    })

    const onSubmit = (e) => {
        e.preventDefault()
        if(RegisterData.password !== RegisterData.confirmPass) console.log('Password mis match')
        else{
            registerUser(RegisterData)
           // console.log(RegisterData)
            setRegisterData({
                name:'',
                email:'',
                password:'',
                confirmPass:'',
                contact:'',
                zipcode:'',
                address:'',
                city:'',
                state:'',
                shopname:'',
                country:'',
            })
        }
    }
    
    const classes = useStyles()

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={(e)=>onSubmit(e)} autoComplete='off'>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                autoComplete="full-name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                onChange={e=>onChange(e)}
                                value = {name}
                                autoFocus
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                onChange={e=>onChange(e)}
                                value = {email}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e=>onChange(e)}
                                value = {password}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                error = {password !== confirmPass}
                                helperText = {password !== confirmPass ? 'Passwords do not Match':''}
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPass"
                                label="Confirm Password"
                                type="password"
                                id="confirmPass"
                                autoComplete="current-password"
                                onChange={e=>onChange(e)}
                                value = {confirmPass}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="contact"
                                label="Contact"
                                type="text"
                                id="contact"
                                autoComplete="contact"
                                onChange={e=>onChange(e)}
                                value = {contact}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="shopname"
                                label="Shop Name"
                                type="text"
                                id="shopName"
                                autoComplete="shop-name"
                                onChange={e=>onChange(e)}
                                value = {shopname}
                            />
                        </Grid>
                        <Grid item sm={8} xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="address"
                                label="Address"
                                type="text"
                                id="address"
                                autoComplete="address"
                                onChange={e=>onChange(e)}
                                value = {address}
                            />
                        </Grid>
                        <Grid item sm={4} xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="zipcode"
                                label="Zip Code"
                                type="text"
                                id="zipcode"
                                autoComplete="zipcode"
                                onChange={e=>onChange(e)}
                                value = {zipcode}
                            />
                        </Grid>
                        <Grid item sm={4} xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="city"
                                onChange={e=>onChange(e)}
                                value = {city}
                            />
                        </Grid>
                        <Grid item sm={4} xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="state"
                                label="State"
                                name="state"
                                autoComplete="state"
                                onChange={e=>onChange(e)}
                                value = {state}
                            />
                        </Grid>
                        <Grid item sm={4} xs={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="country"
                                label="Country"
                                name="country"
                                autoComplete="country"
                                onChange={e=>onChange(e)}
                                value = {country}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}
Register.propType = {
    registerUser: PropTypes.func.isRequired,
}
export default connect(null,{registerUser})(Register)
