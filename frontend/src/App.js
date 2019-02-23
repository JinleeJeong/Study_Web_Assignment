import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Template from './components/Template';
import TopAppBar from './components/TopAppBar';
import Footer from './components/Footer';
import Main from './components/Main';
import CateGory from './components/CateGory';
import ContentsController from './components/ContentsController';
import Detail from './components/Detail';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {  
    return (
      <BrowserRouter> 
        {/* 리덕트 사용할 때 Provider을 통해 연결*/}
          <div className="App">

            <TopAppBar /> 

            <Route exact path="/" component={Template}  />
            <Route path="/contentscontroller" component={ContentsController} />
            <Route path="/main" component={Main} /> 
            {/* 로그인 된 페이지 */}
            <Route path="/category/:id" component={CateGory} />
            <Route path="/category//" component={Error}/>
            <Route path="/detail/:id" component={Detail} />
            <Route path="/detail//" component={Error}/>
            <Footer/>
            {/*출력 Test */}
          </div>
      </BrowserRouter>
      
    );
  }
}
const Error = () => {
  return <div><h3>Error</h3></div>
}

export default App;