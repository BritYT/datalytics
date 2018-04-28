import React from 'react';
import { Navbar, NavbarDivider, NavbarGroup, NavbarHeading, Alignment, Button } from '@blueprintjs/core';


import './navbar.css';


class Navigation extends React.Component {
    render(){
        return (
            <div>
                <Navbar className='pt-dark'>
                    <NavbarGroup className='logo-box'>
                        <NavbarHeading className='logo'><p>Data<span className='logo2'>lytics</span></p></NavbarHeading>
                        <NavbarDivider />
                    </NavbarGroup>
                    <NavbarGroup className='navbar-input-container'>
                        <input className='pt-input navbar-input-box' placeholder="Search your video's..."/>
                    </NavbarGroup>
                    <NavbarGroup align={Alignment.RIGHT}>
                        <Button className="pt-minimal white-icon" icon="home" text="Account" />
                        <Button className="pt-minimal white-icon" icon="log-out" text="Logout" />
                    </NavbarGroup>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;