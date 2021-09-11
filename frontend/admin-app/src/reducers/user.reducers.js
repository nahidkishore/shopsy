import { userConstants } from '../actions/constants';

const initalState = {
  error: null,
  message: '',
  loading: false,
};
export default (state = initalState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = { ...state, loading: true };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = { ...state, loading: false, message: action.payload.message };
      break;
    case userConstants.USER_REGISTER_FAIL:
      state = { ...state, loading: false, error: action.payload.error };
      break;
  }
  return state;
};
