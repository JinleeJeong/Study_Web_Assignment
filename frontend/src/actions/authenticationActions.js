import {USER_CHECK} from './types';
import axios from 'axios';

export const checkAuth = () => async dispatch => {
  console.log("check")
  await axios.post('/api/users/checkAuth')
  .then(res => ({status: res.data.status, email: res.data.email}))
  .then(user => dispatch({
    type: USER_CHECK,
    payload: user
  }))
  .catch(err=> console.log(err));  
} 
