import React from 'react';
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Alignment, Button } from '@blueprintjs/core';
import './navbar.css';

import { connect } from 'react-redux';
import * as user from '../../actions';
import store from '../../config/store';

import {firebase} from '../../config/firebase'

import { Redirect, withRouter } from 'react-router-dom';


const mapStateToProps = (state) => {

    if(state.userReducer.user != null){
        return {
                  isAuthenticated: state.userReducer.isAuthenticated,
                  email:  state.userReducer.user.email,
                  displayPictureURL: state.userReducer.user.photoURL 
            
        }
    }
    return state;
  }
  
class Navigation extends React.Component {

    constructor(props){
        super(props);
    }

    logout = () => {
        this.props.dispatch(user.logout());
    }
   
    render(){
        const {
            isAuthenticated
          } = this.props;
  
  


        return (
            
            <div>
                <Navbar className='pt-dark navbar-container'>
                    <NavbarGroup className='logo-box'>
                        <NavbarHeading className='logo'><p>Data<span className='logo2'>lytics</span></p></NavbarHeading>
                        <NavbarDivider />
                    </NavbarGroup>
                    <NavbarGroup className='navbar-input-container'>
                        <input className='pt-input navbar-input-box' placeholder='Seacrh your videos'/>
                    </NavbarGroup>
 
                   

                    <NavbarGroup align={Alignment.RIGHT}>
                            <span className='email'> {this.props.email} </span>
                            <Button className="pt-minimal white-icon" icon="home" text="Account" />
                            <Button className="pt-minimal white-icon" icon="log-out" onClick={() => { this.logout() }} text="Logout"/>
                    </NavbarGroup>
                </Navbar>
            </div> 
            );
    }
}

export default withRouter(connect(mapStateToProps)(Navigation));