import React, { Component, createContext } from 'react';
import apiClient from '../helpers/apiClient';

const AppContext = createContext();
const { Provider } = AppContext;

export default class AppContextProvider extends Component {
  actions = {
    addContents: async formData => apiClient.post('contents', formData),
    getContents: async () => apiClient.get('contents'),
  }

  render() {
    const { children } = this.props;
    return(
      <Provider value={{ actions: this.actions }}>{ children }</Provider>
    );
  }
}

export {
  AppContext,
};
