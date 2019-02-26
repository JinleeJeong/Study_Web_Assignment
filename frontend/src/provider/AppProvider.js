import React, {Component, createContext} from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
const {Provider, Consumer: AppConsumer} = createContext();

class AppProvider extends Component {

  state = {
    signInInfo: {
      status : false,
      id: '',
      email : ''
    },

    socketConnection : {
      io : null
    }
  }

  actions = {
    setValue : (value)=>{
      this.setState({
        ...this.state,
        signInInfo: value
      })
    },

    checkAuth : async () => {
      return await axios.post('/api/users/checkAuth')
        .then(res => ({status: res.data.status, id: res.data.id, email: res.data.email}))
        .then(user => {
          
          let io = this.state.socketConnection.io;
          const signInStatus = user.status;

          if (io || !signInStatus){
            this.setState({
              ...this.state,
              signInInfo: {
                status: user.status,
                id : user.id,
                email: user.email}
            })
          }
          else{
            io =  socketIOClient('http://localhost:5000');

            this.setState({
              ...this.state,
              socketConnection:{io: io},
              signInInfo: {
                status: user.status,
                id : user.id,
                email: user.email}
            })
          }
        })
        .catch(err=> console.log(err)); 
  }
    
/*
    connectSocket : () => {
      const io = this.state.socketConnection.io;
      const signInStatus = this.state.signInInfo.status;

      if (io || !signInStatus)
        return;
      
      const con = socketIOClient('http://localhost:5000');
      
      this.setState({
        ...this.state,
        socketConnection : {io : con}
      });
    }*/
  }

  render(){
    const {state, actions} = this;

    const value = {state, actions};
    return (
      <Provider value ={value}>
        {this.props.children}
      </Provider>
    )
  }
}

function useContext(WrappedComponent){
  return function UseComtext(props){
    return (
      <AppConsumer>
        {
          ({state, actions}) => (
            <WrappedComponent value = {state} actions={actions}>
            </WrappedComponent>
          )
        }
      </AppConsumer>
    )
  }
}

export {
  AppProvider,
  AppConsumer,
  useContext
};