import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/forms/ProfileForm';
import AccountSettings from './components/account/AccountSettings';
import SearchProfile from './components/profiles/SearchProfile';
import ProfileInfo from './components/profile/ProfileInfo';
import ProfilePosts from './components/profile/ProfilePosts';
import HomePosts from './components/home/HomePosts';
import SinglePost from './components/post/SinglePost';

//Redux
import { useDispatch } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './_actions/authAction';

//CSS
import './App.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Alert />
      <div className='main__content'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/search-profile' component={SearchProfile} />
          <Route exact path='/profile/:id' component={ProfileInfo} />
          <Route exact path='/profile/:id/posts' component={ProfilePosts} />
          <PrivateRoute exact path='/post/:id' component={SinglePost} />
          <PrivateRoute exact path='/create-profile' component={ProfileForm} />
          <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
          <PrivateRoute exact path='/account' component={AccountSettings} />
          <PrivateRoute exact path='/home' component={HomePosts} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
