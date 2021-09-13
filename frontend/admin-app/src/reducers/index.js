import { combineReducers } from 'redux';
import authReducers from './auth.reducers';
import userReducers from './user.reducers';
import productReducer from './product.reducer';
import orderReducer from './order.reducer';
import categoryReducer from './category.reducer';
const rootReducer = combineReducers({
  auth: authReducers,
  user: userReducers,
  category: categoryReducer,
  order: orderReducer,
  product: productReducer,
});
export default rootReducer;
