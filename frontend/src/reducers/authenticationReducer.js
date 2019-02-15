import {USER_CHECK} from '../actions/types';

const initialState = {
  signInInfo: {
    status : null,
    email : '',
  }
}

export default function (state = initialState, action) {
  switch(action.type){
    case USER_CHECK:
      return {
        ... state,
        signInInfo: action.payload
      }
    default:
      return state;
  }
}