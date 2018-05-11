import React from 'react';

import './dashboardVideo.css'

import { Button, Card, Elevation } from "@blueprintjs/core";

import * as dataActions from '../../../actions/dataActions';
import * as user from '../../../actions/index';

import { connect } from 'react-redux';
import store from '../../../config/store';

import { Link } from 'react-browser-router';

class Video extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {

        const userID = localStorage.getItem('userID');
        const YTtoken = localStorage.getItem('YTtoken');
    }

    render(){

        const videoLink = '/dashboard/' + this.props.videoID;

        return (
            <Link to={videoLink}>
            <div className='videoContainer'>
                <div className='video-grid'>
                    <div className='video-grid-item'><img src={this.props.thumbnail} width="150" height='100%'/></div>
                    <div className='video-grid-item'><p>{this.props.title}</p></div>
                    <div className='video-grid-item'><p>{(parseInt(this.props.averageWatchPercentage) > 30) ? <span className="pt-icon-standard pt-icon-tick pt-icon-green" /> : <span className="pt-icon-standard pt-icon-cross pt-icon-red" />} {this.props.averageWatchPercentage }</p></div>
                    <div className='video-grid-item'><p><b>{ this.props.likes }</b></p></div>
                    <div className='video-grid-item'><p>{ this.props.commentCount }</p></div>
                    <div className='video-grid-item'><p>{this.props.views}</p></div>
                    <div className='video-grid-item'><p>Positive</p></div>
                </div>
            </div>
            </Link>
        );
    }
}



const mapStateToProps = (state) => {

    if(state.userReducer.user != null && state.dataReducer.user != null){
        return {
            videos: state.dataReducer.user.videoStats,
        }
    }
    return state;
  }
  

export default connect(mapStateToProps)(Video);