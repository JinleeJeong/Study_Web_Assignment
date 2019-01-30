import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Template from './components/Template';
import SignUpPage from './components/SignUpPage';
import SignIn from './components/SignIn';
import './App.css';
import TopAppBar from './components/TopAppBar';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/user')
    .then(res => {
      this.setState({ 
        users: res.data 
      });
      console.log(this.state.users);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <TopAppBar />
          <Route exact path="/" component={Template} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUpPage} />
          {this.state.users.map((user, index) =>
            <div key={index}>
              <div>{user.email}</div>
              <div>{user.password}</div>
              <div>{user.passwordConfirmation}</div>
            </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
