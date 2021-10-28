import axios from '../helpers/axios';
import { productConstants } from "./constants";
/* export const addProduct = (form) => {
  return async (dispatch) => {
    const res = await axios.post(`product/create`, form);
    console.log(res);
  };
}; */


// new action
const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
      const res = await axios.post(`product/getProducts`);
      if (res.status === 200) {
        const { products } = res.data;
        dispatch({
          type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
      } else {
        dispatch({ type: productConstants.GET_ALL_PRODUCTS_FAIL });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
// modified action
export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axios.post(`product/create`, form);
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        dispatch(getProducts());
      } else {
        dispatch({ type: productConstants.ADD_PRODUCT_FAIL });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

