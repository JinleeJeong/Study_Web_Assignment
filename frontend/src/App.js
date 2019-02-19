import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';

import PropTypes from 'prop-types';

import Template from './components/Template';
import TopAppBar from './components/TopAppBar/TopAppBar';
import test from './images/test.png';
import SignUpPage from './components/Signup/SignUpPage';
import SignInPage from './components/SignIn/SignInPage';
import MyMessagePage from './components/MyMessage/MyMessagePage';
import MyPage from './components/MyPage/MyPage';

import {AppProvider} from '../src/provider/AppProvider';

class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <AppProvider>
          <BrowserRouter>
            <div className="App">
              <TopAppBar />
              <div>
                <Switch>
                  <Route exact path="/" render={() => <Template test = {test}/>}/>
                  <Route path="/signup" component = {SignUpPage}/>
                  <Route path="/signin" component = {SignInPage}/>
                  <Route path="/mypage" component = {MyPage}/>
                  <Route path="/mymessagepage" component = {MyMessagePage}/>
                </Switch>
              </div>
            </div>
          </BrowserRouter>
        </AppProvider>
    );
  }
}

export default App;
