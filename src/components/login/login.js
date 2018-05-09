import React from 'react';

import { Icon, InputGroup, Button, FormGroup} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { Redirect, withRouter, Link} from 'react-router-dom';

//Library
import Particles from 'react-particles-js';

import { connect } from 'react-redux';
import * as user from '../../actions';

import './login.css';

import store from '../../config/store';


class LoginPage extends React.Component {

    constructor(props){
        super(props);
    }

    onSubmit = (event) => {
      event.preventDefault();
      this.props.dispatch(user.loginUser(this.email.value, this.password.value));
      this.props.history.push('/youtubeauth');
    }
      

    render(){
        const {
          isAuthenticated
        } = this.props;


        return (
          isAuthenticated ? <Redirect to='/youtubeauth'/> : (
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
                               resize   : true
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
                           retina_detect   : true 
                      }
                }
                    style={{
                        width: '100%'
                    }} />
                <div className='container'>
                <div className='form-header'>
                            <h3> Login </h3>
                </div>
                <div className='login-container'>
                    <div className='form-container'>
                        <form>
                        <FormGroup
                            label="Email"
                            labelFor="email-inpu"
                            requiredLabel={true}
                        >
                        <input className='pt-input' id="email-input" placeholder="Enter your email..." ref={(input) => {this.email = input}} />
                        </FormGroup>
                        <FormGroup
                            label="Password"
                            labelFor="pw-input"
                            requiredLabel={true}
                        >
                        <input className='pt-input' type='password' id="pw-input" placeholder="Enter your password..." ref={(input) => {this.password = input}}/>
                        </FormGroup>
                        <div className='pt-button-group'>
                            <input type="submit" className="pt-button pt-intent-primary" value='Forgot Password'/>
                            <input type="submit" onClick={(event)=> {this.onSubmit(event)}} className="pt-button pt-icon-arrow-right pt-intent-success" value='     Log In     '/>
                        </div>
                        </form>
                        <div className='form-noaccount'>
                            <span className='not-registered'>Not registered? <Link to='/signup'>Create an account</Link></span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        ));
    }
}

const mapStateToProps = (state) => {
  return {
          isAuthenticated: state.userReducer.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));