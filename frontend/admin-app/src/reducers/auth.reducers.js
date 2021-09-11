import { authConstants } from "../actions/constants"

const initalState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
  },
  authenticate: false,
  authenticating: false,
}
 export  default (state = initalState, action)=>{
  console.log(action);
  
  switch (action.type) {
    case authConstants.USER_LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true
      }
      break;
    case authConstants.USER_LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating:false,
      }
      break;
    case authConstants.USER_LOGOUT_REQUEST:
      state = {
        ...initalState
      }
      break;
  }
  return state;
}