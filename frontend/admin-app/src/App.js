import './App.css';
import {  Switch, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Signin from './containers/Signin/Signin';
import Signup from './containers/Signup/Signup';
import PrivateRoute from './components/HOC/PrivateRoute'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    
  }, [dispatch, auth.authenticate]);
  return (
    <div className='App'>
    
        <Switch>
          <PrivateRoute path='/' exact component={Home} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
        </Switch>
    
    </div>
  );
}

export default App;
