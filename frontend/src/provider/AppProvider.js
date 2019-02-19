import React, {Component, createContext} from 'react';
import axios from 'axios';
const {Provider, Consumer: AppConsumer} = createContext();

class AppProvider extends Component{

  state = {
    signInInfo: {
      status : null,
      email : '',
    }
  }

  actions = {
    setValue : (value)=>{
      this.setState({
        ...this.state,
        signInInfo: value
      })
    },

    checkAuth : async ()=>{
      await axios.post('/api/users/checkAuth')
        .then(res => ({status: res.data.status, email: res.data.email}))
        .then(user => {this.setState({
          ...this.state,
          signInInfo: {
            status: user.status,
            email: user.email
          }
        })})
        .catch(err=> console.log(err));  
    }
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