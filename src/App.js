import React, { Component } from 'react'; 
import { BrowserRouter, Route, Redirect, Browser} from 'react-browser-router';

import './App.css';

import Navigation from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import LoginPage from './components/login/login';
import SignupPage from './components/signup/signup';
import Dashboard from './components/dashboard/dashboard';
import HomePage from './components/home/home'
import YouTubeAuthPage from './components/youtube-auth/youtube-auth'

import {auth, firebase } from './config/firebase';

import {connect} from 'react-redux';

import store from './config/store';

class App extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    firebase.auth.onAuthStateChanged((user)=> {
      if(user){
        store.dispatch({type: 'SET_USER_DATA', payload: user});
        store.dispatch({type: 'SET_USER_ID', payload: user.uid});
        window.localStorage.setItem("user", user);
        window.localStorage.setItem("userID", user.uid);
      }else if(user == null) {
        window.localStorage.removeItem("user");
        console.log('not logged in');
      }
    });
  }

  render() {
    return ( 
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" exact component={HomePage}/>
            <Route path='/login' history render={() => firebase.isAuthenticated() ? (<Redirect to='/dashboard'/>) :(<LoginPage/> )}/>
            <Route path='/signup' history component={SignupPage}/>
            <Route path='/youtubeauth' history render={() => firebase.isYoutubeAuthed() ? (<YouTubeAuthPage />) : (<Redirect to='/dashboard'/>)}  />
            <Route path='/dashboard' render={() => firebase.isAuthenticated() ? (<Dashboard />) : (<Redirect to='/login'/>)} />
          </React.Fragment> 
        </BrowserRouter>
    );
 }
}

export default App;
