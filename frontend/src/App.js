import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Template from './components/Template';
import TopAppBar from './components/TopAppBar';
import test from './images/test.png';
import SignUpPage from './components/Signup/SignUpPage';
import SignInPage from './components/SignIn/SignInPage';
import './App.css';

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
