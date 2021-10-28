import { productConstants } from "../actions/constants";

const initalState = {
  products: [],
  productsByPrice: {
    under5K: [],
    under10k: [],
    under15k: [],
    under20k: [],
    under25k: [],
    under30k: [],
    under35k: [],
    under40k: [],
    under50k: [],
  }
}
export default (state = initalState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state, products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice
        }
      }
      break;
  }
  return state;
}