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
    addContents: formData => apiClient.post('/contents', formData),
    getContentsR1: () => apiClient.get('/contents/r1'),
    getContentsR2: () => apiClient.get('/contents/r2'),
    getContentsByCategory: searchTerm => apiClient.get(`/contents/context/${searchTerm}`), //메인 검색창에서 카테고리 검색 시 데이터 보여줌
    getContentsDetail: detailTerm => apiClient.get(`/contents/detail/${detailTerm}`), //상세내용 보여줌
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
