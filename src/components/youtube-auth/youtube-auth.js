import React from 'react';

import { Icon, InputGroup, Button, FormGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { Redirect, withRouter } from 'react-router-dom';

//Library
import Particles from 'react-particles-js';

import { connect } from 'react-redux';
import * as user from '../../actions';

import './youtube-auth.css';

import store from '../../config/store';

import { firebase } from '../../config/firebase'

import { GoogleLogin } from 'react-google-login';
import axios from 'axios';


class YouTubeAuthPage extends React.Component {

  constructor(props) {
    super(props);

  }

  responseGoogle = (response) => {
    
    axios.post('http://localhost:3001/auth', {token: response}).then((data) => {  
      console.log(data);
      let user = localStorage.getItem('userID');
      firebase.database.ref('/users/' + user).update({
        YouTubeToken: data.data.tokens.access_token,
        RefreshToken: data.data.tokens.refresh_token
      }).then(() => {
        localStorage.setItem('YTtoken', data.data.tokens.access_token);
        this.props.dispatch({ type: 'SET_YOUTUBE_TOKEN_AND_AUTHED', payload: response.accessToken });
        this.props.history.push('/dashboard');
      });
      console.log(response);

    });


    

  }

  componentDidMount() {
    if(localStorage.getItem('YTtoken') == null){
      this.props.dispatch(user.fetchYouTubeToken());
    }
  }

  render() {
    return (
      <div className='loginpage'>
        <Particles className='background' params={{
          particles: {
            number: {
              value: 1000,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#ffffff"
            },
            shape: {
              type: "edge",
              stroke: {
                width: 0,
                color: "#000000"
              },
              polygon: {
                nb_sides: 5
              },
              image: {
                src: "img/github.svg",
                width: 100,
                height: 100
              }
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 4,
                size_min: 0.3,
                sync: false
              }
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 600
              }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: false,
                mode: "bubble"
              },
              onclick: {
                enable: false,
                mode: "repulse"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 250,
                size: 0,
                duration: 2,
                opacity: 0,
                speed: 3
              },
              repulse: {
                distance: 400,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        }
        }
          style={{
            width: '100%'
          }} />
        <div className='container'>
          <div className='form-header'>
            <h3> SUCCESS! </h3>
          </div>
          <div className='login-container'>
            <div className='form-container'>
              <form>
                <p> Great! Now authenticate your YouTube account so we can analyse your data </p>
                <div className='pt-button-group'>
                  <GoogleLogin
                    clientId="334188807296-t4d4140t32jva0t1l44ab743q9iasbpp.apps.googleusercontent.com"
                    buttonText="Login With Youtube"
                    scope="https://www.googleapis.com/auth/youtube.readonly"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    accessType='offline'
                    responseType='code'
                  />
                </div>
              </form>
              <div className='form-noaccount'>
                <span className='not-registered'>Not registered? <a href='#'>Create an account</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: {
      loggedIn: state.userReducer.loggedIn,
      isAuthenticated: state.userReducer.isAuthenticated,
      user: state.userReducer.user,
      uid: state.userReducer.uid
    }
  }
}

export default connect(mapStateToProps)(withRouter(YouTubeAuthPage));