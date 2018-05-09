import React, { Component } from 'react'; 

import Navigation from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import DashboardCanvas from '../dashboardComponents/dashboardCanvas/dashboardCanvas'

class Dashboard extends Component {

  constructor(props) {
    super(props);
   }

  
  render() {
    return ( 
        <React.Fragment>
            <Navigation />
            <Sidebar />
            <DashboardCanvas />
        </React.Fragment>
    );
  }
}

export default Dashboard;
