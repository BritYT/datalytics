import React from 'react';

import './dashboardVideos.css'

import { Button, Card, Elevation } from "@blueprintjs/core";

import * as dataActions from '../../../actions/dataActions';
import * as user from '../../../actions/index';

import { connect } from 'react-redux';
import store from '../../../config/store';

import Video from '../dashboardVideo/dashboardVideo'

class DashboardVideos extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {

        const userID = localStorage.getItem('userID');
        const YTtoken = localStorage.getItem('YTtoken');
    }

    render(){

        let test = [];

        if(this.props.videos != null){
            this.props.videos.forEach(video => {
                test.push(<Video key={video.id} title={ video.snippet.title } videoID= { video.id } likes={ video.statistics.likeCount } views={video.statistics.viewCount} thumbnail={ video.snippet.thumbnails.medium.url } commentCount={ video.statistics.commentCount} averageWatchPercentage={(video.averageWatchPercentage).toFixed(2) + '%'}/>);
            });
        }


        return (
            <div className='dashboardVideos'>
                <div className='dashboard-column-names-container'>
                    <div className='dashboard-column-name'>Thumbnail</div>
                    <div className='dashboard-column-name'>Title</div>
                    <div className='dashboard-column-name'>Retention %</div>
                    <div className='dashboard-column-name'>Likes</div>
                    <div className='dashboard-column-name'>Comments</div>
                    <div className='dashboard-column-name'>Views</div>
                    <div className='dashboard-column-name'>Semantic Analysis</div>
                    
                </div>
                <div className='dashboardVideosContainer'>
                    { test }
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    if(state.userReducer.user != null && state.dataReducer.user != null){
        return {
            videos: state.dataReducer.user.videoStats
        }
    }
    return state;
  }
  

export default connect(mapStateToProps)(DashboardVideos);