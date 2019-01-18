import React, { Component } from 'react';
import TopAppBar from './components/TopAppBar';
import SignUp from './components/SignUp';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopAppBar />
        <SignUp />
      </div>
    );
  }
}

export default App;
