import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import axios from 'axios';

import PropTypes from 'prop-types';

import Template from './components/Template';
import TopAppBar from './components/TopAppBar/TopAppBar';
import test from './images/test.png';
import SignUpPage from './components/Signup/SignUpPage';
import SignInPage from './components/SignIn/SignInPage';
import './App.css';

import store from './store';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      signInInfo : null
    }
    
    store.subscribe(()=>{
      const state = store.getState().userLogin;
      this.setState({
        ...this.state,
        signInInfo : state.signInInfo
      });
    })
  }

  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <div className="App">
            <TopAppBar />
            <div>
              <Switch>
                <Route exact path="/" render={() => <Template test = {test}/>}/>
                <Route path="/signup" component = {SignUpPage}/>
                <Route path="/signin" component = {SignInPage}/>
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
