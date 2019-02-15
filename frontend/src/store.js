import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'

const initialState = {};

const middleware = [thunk];

const getComposeEnhancers = () =>{
  if (window.navigator.userAgent.includes('Chrome')){
    return compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
  return compose(applyMiddleware(...middleware))
}

const store = createStore(
  rootReducer,
  initialState,
  getComposeEnhancers()
);

export default store;