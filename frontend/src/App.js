import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Template from './components/Template';
import TopAppBar from './components/TopAppBar';
import './App.css';
import SignUpPage from './components/SignUpPage';
import SignIn from './components/SignIn';
import Footer from './components/Footer';
import axios from 'axios';
// import test from './images/test.png';
// import SignUpPage from './components/SignUpPage';
// import Main from './components/Main';

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
        {/* 리덕트 사용할 때 Provider을 통해 연결*/}
          <div className="App">

            <TopAppBar /> 
            {/*고정된 상태*/}

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
            {/*출력 Test */}

            {/* <Route path="/main" component={Main}/>  */}
            <Footer/> {/*고정된 상태*/}
          </div>
      </BrowserRouter>
    );
  }
}

export default App;