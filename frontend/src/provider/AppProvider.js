import React, {Component, createContext} from 'react';

const Context = createContext();

const {Provider, Consumer: UserConsumer} = Context;

class AppProvider extends Comment{
  state = {

  }

  actions = {

  }

  render(){
    const {state, actions} = this;

    const value = {state, actions};
    return (
      <Provider>
        {this.props.children}
      </Provider>
    )
  }
}

export {
  AppProvider,
  UserConsumer
};