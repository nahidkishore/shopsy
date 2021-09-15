import './App.css';
import { Switch, Route } from 'react-router-dom';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, isUserLoggedIn } from './actions';
import HomeScreen from './containers/Screen/HomeScreen';
import ProductScreen from './containers/Screen/ProductScreen';
import OrderScreen from './containers/Screen/OrderScreen';
import CategoryScreen from './containers/Screen/CategoryScreen';
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, [dispatch, auth.authenticate]);
  return (
    <div className='App'>
      <Switch>
        <PrivateRoute path='/' exact component={HomeScreen} />
        <PrivateRoute path='/products' component={ProductScreen} />
        <PrivateRoute path='/orders' component={OrderScreen} />
        <PrivateRoute path='/category' component={CategoryScreen} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
