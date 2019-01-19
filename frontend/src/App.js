import React, { Component } from 'react';
import Template from './components/Template';
import TopAppBar from './components/TopAppBar';
import test from './images/test.png';
import SignUpPage from './components/SignUpPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopAppBar />
        <Template test={test} />
        <SignUpPage />
      </div>
    );
  }
}

export default App;
