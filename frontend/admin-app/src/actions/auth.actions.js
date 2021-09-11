import axios from '../helpers/axios';
import { authConstants } from './constants';

// login action
export const login = (user) => {
  console.log(user);

  return async (dispatch) => {
    dispatch({ type: authConstants.USER_LOGIN_REQUEST });
    const res = await axios.post('/admin/signin', {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: authConstants.USER_LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.USER_LOGIN_FAIL,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch({
        type: authConstants.USER_LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstants.USER_LOGIN_FAIL,
        payload: { error: 'Login failed' },
      });
    }
  };
};
export const signout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch({
      type: authConstants.USER_LOGOUT_REQUEST,
    });
  };
};
