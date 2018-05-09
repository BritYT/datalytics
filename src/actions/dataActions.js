import axios from 'axios';
import { firebase } from '../config/firebase'

export function getYouTubeData(user, token) {

    let databaseData = {};

    let headers = {
        'Authorization': ' Bearer ' + token
    }
    return (dispatch) => {
        dispatch({ type: 'DASHBOARD_LOADING', payload: true });
        firebase.database.ref('/users/' + user).once('value', (result) => {
            /*
            =========================
            CHECK IF DATABASE HAS ENTRY'S FIRST TO USE LESS QUOTA FROM YT API. 
           =========================
            */
            if (result.hasChild('isUpdated')) {
                //TODO: Dispatch all info here under one dispatch 
                let data = result.val();
                dispatch({ type: 'UPDATE_DASHBOARD', payload: data });
            } else {

                /*
                =========================
                HANDLE ALL API CALLS HERE 
                =========================
                */

                /* 

                THIS SECTIONS GETS AND UPDATES THE TOTAL WATCH TIME AMOUNT AND RETURNS IT IN MINUTES. 

                */
                axios.get(`https://content-youtubeanalytics.googleapis.com/v2/reports?dimensions=month&endDate=2018-05-01&ids=channel%3D%3DMINE&metrics=estimatedMinutesWatched&startDate=2012-05-01&access_token=` + result.val().YouTubeToken, { compress: false }).then((response) => {
                    let totalwatchTime = response.data.rows.reduce((acum, currentValue) => parseInt(acum) + parseInt(currentValue[1]));
                    firebase.database.ref('/users/' + user).update({
                        totalwatchTime: totalwatchTime
                    });
                    dispatch({ type: 'UPDATE_WATCH_TIME', payload: totalwatchTime });
                }).catch((error) => {
                    if (error.response.status === 401) {
                        firebase.database.ref('/users/' + user).once('value', (snapshot) => {
                            if (snapshot.hasChild('RefreshToken')) {
                                axios.post('http://localhost:3001/api/auth/refreshToken', { token: snapshot.val().RefreshToken }).then((response) => {
                                    firebase.database.ref('/users/' + user).update({
                                        YouTubeToken: response.data.data.access_token
                                    }).then(() => {
                                        getYouTubeData(user, response.data.data.access_token);
                                    })
                                });
                            }
                        })
                    };
                });

                /* 

                THIS SECTION WILL COLLECT AND UPDATE THE CHANNEL STATISTICS E.G TOTAL VIEWS, TOTAL SUBSCRIBERS ETC...
                
                */

                axios.get(`https://content.googleapis.com/youtube/v3/channels?mine=true&part=snippet%2CcontentDetails%2Cstatistics&access_token=` + result.val().YouTubeToken, { compress: false }).then((response) => {
                    console.log(response)
                    firebase.database.ref('/users/' + user).update({
                        uploadPlaylists: response.data.items["0"].contentDetails.relatedPlaylists.uploads,
                        channelStats: response.data.items["0"].statistics
                    });
                    dispatch({ type: 'UPDATE_CHANNEL_STATS', payload: response.data.items["0"].statistics });
                }).catch((error) => {

                });

                axios.get(`https://content.googleapis.com/youtube/v3/channels?mine=true&part=snippet%2CcontentDetails%2Cstatistics&access_token=` + result.val().YouTubeToken, { compress: false }).then((response) => {
                    console.log(response)
                    firebase.database.ref('/users/' + user).update({
                        channelStats: response.data.items["0"].statistics
                    });
                    dispatch({ type: 'UPDATE_CHANNEL_STATS', payload: response.data.items["0"].statistics });
                }).catch((error) => {

                });

                dispatch({ type: 'LOADING_USER_VIDEOS', payload: true });
                firebase.database.ref('/users/' + user).once('value', (databaseResult) => {
                    if (databaseResult.hasChild('uploadPlaylists')) {
                        const playlistID = databaseResult.val().uploadPlaylists;
                        axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistID}&maxResults=49&part=snippet%2CcontentDetails&key=AIzaSyB_7zRgvFL1RzgId2EN9vaaILUQYJiucJs`, { compress: false }).then((response) => {
                            const videoIDs = response.data.items.map(currentVideo => {
                                return currentVideo.contentDetails.videoId
                            });

                            console.log(videoIDs.length);

                            firebase.database.ref('/users/' + user).update({
                                channelVideos: videoIDs
                            }).then(() => {
                                /* 

                               CALLING YOUTUBE API TO RECIEVE INFO ABOUT EACH VIDEO

                               */
                                let queryString = '';
                                let averageWatchPercentageString = 'video%3D%3D';
                                videoIDs.slice(0, 50).forEach(videoID => {
                                    queryString += videoID + "%2C";
                                });

                                axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${queryString}&part=snippet%2Cstatistics&key=AIzaSyB_7zRgvFL1RzgId2EN9vaaILUQYJiucJs`, { compress: false }).then((videoResults) => {
                                    firebase.database.ref('/users/' + user).update({
                                        videoStats: videoResults.data.items
                                    }).then(() => {
                                        for (let i = 0; i < videoIDs.length; i++) {
                                            axios.get(`https://youtubeanalytics.googleapis.com/v2/reports?endDate=2018-05-06&filters=video=%3D${videoIDs[i]}&ids=channel%3D%3DMINE&metrics=averageViewPercentage&startDate=2014-01-01&key=AIzaSyB_7zRgvFL1RzgId2EN9vaaILUQYJiucJs&access_token=${result.val().YouTubeToken}`, { compress: false }).then((watchPercResults) => {
                                                firebase.database.ref('/users/' + user + '/videoStats/' + i).update({
                                                    averageWatchPercentage: watchPercResults.data.rows["0"]["0"]
                                                })
                                            }).catch((err) => {
                                                console.log(err);
                                            });
                                        }
                                    }).then(()=> {
                                        dispatch({type: 'GOT_ALL_VIDEO_DATA', payload: videoResults.data.items});
                                        firebase.database.ref('/users/' + user).update({
                                            isUpdated: true
                                        }).then(()=>{
                                            firebase.database.ref('/users/' + user).once('value', (data)=> {
                                                dispatch({ type: 'UPDATE_DASHBOARD', payload: data.val() });
                                            })
                                        })
                                    }); 
                                }).catch((err) => {

                                    console.log(err);
                                });
                            });
                        }).catch((error) => {
                            console.log(error);
                        });

                    }
                })

            }
        })
    }
}
