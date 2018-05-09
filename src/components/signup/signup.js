import React from 'react';

import { Icon, InputGroup, Button, FormGroup} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { Link, withRouter } from 'react-router-dom';

//Library
import Particles from 'react-particles-js';

import {auth} from '../../config/firebase';

import { connect } from 'react-redux';

import './signup.css';


import store from '../../config/store';

const INITIAL_STATE = {
  email: '', 
  passwordOne: '', 
  passwordTwo: '',
  error: null
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});


class SignupPage extends React.Component {

    constructor(props){
     
      super(props);
      this.state = {...INITIAL_STATE};

    }

    onSubmit = (event) => {

      event.preventDefault();

      const {
        email,
        passwordOne
      } = this.state;


      const {
        history
      } = this.props;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne).then(authUser => {
        this.setState(() => ({...INITIAL_STATE}));
        this.props.dispatch({type: 'SIGN_IN'});
        this.props.history.push('/youtubeauth')
      }).
      catch(error => {
        this.setState(byPropKey('error', error));
      })

      
    }
  
    render(){

      const {
        email, 
        passwordOne, 
        passwordTwo,
        error,
      } = this.state;

      const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === ''; 

      

        return (
            <div className='loginpage'> 
                <Particles className='background' params={{    
                    particles: {
                          number: {
                            value: 160,
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
                             opacity   : {
                               value   : 0.5,
                               random   : true,
                               anim   : {
                                 enable   : true,
                                 speed   : 1,
                                 opacity_min   : 0,
                                 sync   : false
                            }
                          },
                             size   : {
                               value   : 3,
                               random   : true,
                               anim   : {
                                 enable   : false,
                                 speed   : 4,
                                 size_min   : 0.3,
                                 sync   : false
                            }
                          },
                             line_linked   : {
                               enable   : false,
                               distance   : 150,
                               color   :    "#ffffff",
                               opacity   : 0.4,
                               width   : 1
                          },
                             move   : {
                               enable   : true,
                               speed   : 1,
                               direction   : "none"   ,
                               random   : true,
                               straight   : false,
                               out_mode   :    "out"   ,
                               bounce   : false,
                               attract   : {
                                 enable   : false,
                                 rotateX   : 600,
                                 rotateY   : 600
                            }
                          }
                        },
                           interactivity   : {
                             detect_on   :    "canvas"   ,
                             events   : {
                               onhover   : {
                                 enable   : false,
                                 mode   :   "bubble"   
                            },
                               onclick   : {
                                 enable   : false,
                                 mode   :   "repulse"   
                            },
                               resize   : false
                          },
                             modes: {
                               grab: {
                                 distance: 400,
                                 line_linked   : {
                                   opacity   : 1
                              }
                            },
                               bubble   : {
                                 distance   : 250,
                                 size   : 0,
                                 duration   : 2,
                                 opacity   : 0,
                                 speed   : 3
                            },
                               repulse   : {
                                 distance   : 400,
                                 duration   : 0.4
                            },
                               push   : {
                                 particles_nb   : 4
                            },
                               remove   : {
                                 particles_nb   : 2
                            }
                          }
                        },
                           retina_detect   : false 
                      }
                }
                    style={{
                        width: '100%'
                    }} />
                <div className='container'>
                <div className='form-header'>
                            <h3> Create Account </h3>
                </div>
                <div className='login-container'>
                    <div className='form-container'>
                        <form onSubmit={this.onSubmit}>
                        <FormGroup
                            label="Email "
                            labelFor="email-input"
                            requiredLabel={true}
                        >
                        <input className='pt-input' id="email-input" placeholder="Enter your email..." value={email} onChange={event => { 
                          
                          this.setState(byPropKey('email', event.target.value))
                        
                       }} />
                        </FormGroup>
                        <FormGroup
                            label="Password "
                            labelFor="pw-input"
                            requiredLabel={true}
                        >
                        <input className='pt-input' id="pw-input" type='password' placeholder="Enter a password..." value={passwordOne} onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}/>
                        </FormGroup>
                        <FormGroup
                            label="Re-enter password "
                            labelFor="pw-input2"
                            requiredLabel={true}
                        >
                        <input className='pt-input' id="pw-input2" type='password' placeholder="Re-enter your password..." value={passwordTwo} onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}/>
                        </FormGroup>
                        {error && <p>{error.message}</p>}
                        <div className='pt-button-group'>
                            <input type="submit" className="pt-button pt-intent-primary" value='Forgot Password'/>
                            <input type="submit" disabled={isInvalid} className="pt-button pt-icon-arrow-right pt-intent-success" value='    Sign Up    '/>
                        </div>
                        </form>
                        <div className='form-noaccount'>
                            <span className='not-registered'>Already got an account? <Link to='/login'>Log In</Link></span>
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
            isAuthenticated: state.userReducer.isAuthenticated
      }
  }
}

export default connect(mapStateToProps)(withRouter(SignupPage));