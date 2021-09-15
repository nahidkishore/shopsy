import { productConstants } from "../actions/constants"
const initalState = {
  products:[]
}
export default (state= initalState,action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
      products: action.payload.products,
      }
      break;
  }
  return state;
}