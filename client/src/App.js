import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () =>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </section>
    </Fragment>
  </Router>

export default App
