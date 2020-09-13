import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import AlertMsg from './components/layout/AlertMsg'
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store'
import {Provider} from 'react-redux'
import Sidebar from './components/layout/Sidebar'
import Main  from './components/layout/Main';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
}));



const App = () =>{
  const classes = useStyles();
  return( 
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          {/* <Sidebar/> */}
          {/* <Main/> */}
          <div className={classes.content}>
            <Route exact path="/" component={Landing} />
            <section className="container">
              <AlertMsg/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </section>
          </div>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
