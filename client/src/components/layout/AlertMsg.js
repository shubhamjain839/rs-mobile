import React,{Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import setAlert from '../../actions/alert'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));

const AlertMsg = ({alerts}) => {
  const classes = useStyles();
  
  return (
    <Container className={classes.root}>
        <Grid container spacing={2}>
          {alerts?.map(
            alert => 
              <Grid key={alert.id} item sm={6} xs={12}>
                <Alert severity={alert.alertType}>{alert.msg}</Alert>
              </Grid>
          )}
        </Grid>
    </Container>
  );
}
AlertMsg.propTypes = {
  alerts : PropTypes.array.isRequired,
}
const mapStateToProps = state => ({
  alerts:state.alertReducer,
})
export default connect(mapStateToProps)(AlertMsg)