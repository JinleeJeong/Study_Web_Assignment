import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Template from './components/Template';
import './App.css';
import TopAppBar from './components/TopAppBar';
import ContentsController from './components/contents/ContentsController';
import ContentsListView from './components/contents/ContentsListView';
import Test1 from './components/Test1';
import Test2 from './components/Test2';
import AppContextProvider from './contexts/appContext';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     users: []
  //   };
  // }

  // componentDidMount() {
  //   axios.get('http://localhost:8080/api/user')
  //   .then(res => {
  //     this.setState({ 
  //       users: res.data 
  //     });
  //     console.log(this.state.users);
  //   });
  // }

  render() {
    return (
      <>
        <AppContextProvider>
          <BrowserRouter>
            <div className="App">
              <TopAppBar />
              <Route exact path="/" component={Template} />
              <Route path="/write" component={ContentsController} />
              <Route path="/contents" component={ContentsListView} />
              <Route path="/test1" component={Test1} />
              <Route path="/test2" component={Test2} />
            </div>
          </BrowserRouter>
        </AppContextProvider>
      </>
    );
  }
}

export default App;
