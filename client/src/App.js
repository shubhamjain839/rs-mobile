import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import AlertMsg from './components/layout/AlertMsg'
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store'
import {Provider} from 'react-redux'
const App = () =>
<Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">
        <AlertMsg/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </section>
    </Fragment>
  </Router>
  </Provider>

export default App
