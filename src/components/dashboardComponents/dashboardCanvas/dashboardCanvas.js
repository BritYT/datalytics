

import React from 'react';
import Moment from 'react-moment';

import './dashboardCanvas.css';

import { Button, Card, Elevation } from "@blueprintjs/core";

import * as dataActions from '../../../actions/dataActions';
import * as user from '../../../actions/index';

import { connect } from 'react-redux';
import store from '../../../config/store';

import DashboardVideos from '../dashboardVideos/dashboardVideos'
let dispatched = false;


class DashboardCanvas extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {

        const userID = localStorage.getItem('userID');
        const YTtoken = localStorage.getItem('YTtoken');

        if(userID != null && YTtoken != null){
            this.props.dispatch(dataActions.getYouTubeData(userID, YTtoken))
        }

        if(localStorage.getItem('YTtoken') == null){
            this.props.dispatch(user.fetchYouTubeToken());
          }
    }

    render(){
        return (
            <div>
                <div className='dashboardCanvas'>
                <Card className='grid-item' interactive={false} elevation={Elevation.TWO}>
                    <h5>Average View<br></br> Duration</h5>
                    <p>{ (this.props.averageWatchPercentage / 1).toFixed(2)}%</p>
                </Card>
                <Card className='grid-item' interactive={false} elevation={Elevation.TWO}>
                    <h5>Total Channel<br></br> Watch Time</h5>
                    <p> { (this.props.totalWatchTime / 525600).toFixed(2) } Years</p>
                </Card>
                <Card className='grid-item' interactive={false} elevation={Elevation.TWO}>
                    <h5>Total Subscriber<br></br> Count</h5>
                    <p> {this.props.totalSubscribers }</p>
                </Card>
                </div>
                <DashboardVideos/>
            </div>
        );
    }
}



const mapStateToProps = (state) => {

    if(state.userReducer.user != null && state.dataReducer.user != null){
        return {
                totalWatchTime: state.dataReducer.user.totalwatchTime,
                totalSubscribers: state.dataReducer.user.channelStats.subscriberCount,
                averageWatchPercentage: state.dataReducer.user.channelWatchPercentage
        }
    }
    
    return state;
  }
  

export default connect(mapStateToProps)(DashboardCanvas);