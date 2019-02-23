import React, { Component, createContext } from 'react';
import apiClient from '../helpers/apiClient';

const AppContext = createContext();
const { Provider } = AppContext;

export default class AppContextProvider extends Component {
  state = {
    //서울시청 초기화
    lat: 37.5666035,
    lng: 126.9783868,
  }

  actions = {
    addContents: async formData => apiClient.post('contents', formData),
    getContents: async () => apiClient.get('contents'),
    getCurrentPosition: () => {
      navigator.geolocation.getCurrentPosition((position) => {
        return this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    },
  }

  render() {
    const { children } = this.props;
    return(
      <Provider value={{ state: this.state, actions: this.actions }}>{ children }</Provider>
    );
  }
}

export {
  AppContext,
};
