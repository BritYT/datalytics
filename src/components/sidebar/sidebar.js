import React from 'react';

import { Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import './sidebar.css';


class Sidebar extends React.Component {
    render(){
        return (
            <div>
                <div className='sidebar-container'>
                    <div className='sidebar-links-container'>
                        <ul className='sidebar-ul'>
                            <li className='menu-title'><h3>Menu</h3></li>
                            <li className='menu-item'><Icon icon='dashboard' iconSize='20' className='menu-icon'/><p>Video Analytics</p></li>
                            <li className='menu-item'><Icon icon='trending-up' iconSize='20' className='menu-icon'/><p>Channel Analytics</p></li>
                            
                            <li className='menu-title'><h3>Competition</h3></li>
                            <li className='menu-item'><Icon icon='video' iconSize='20' className='menu-icon'/><p>Video Analyzer</p></li>
                            <li className='menu-item'><Icon icon='predictive-analysis' iconSize='20' className='menu-icon'/><p>Channel Analyzer</p></li>
                        </ul>
                    </div>
                </div>poo
            </div>
        );
    }
}

export default Sidebar;