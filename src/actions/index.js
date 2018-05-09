import { firebase, auth, database } from '../config/firebase'


export function getUser() {
    return {
        type: 'GET_USER_DATA',
        payload: firebase.auth.currentUser
    };
}

export function loginUser(email, password) {
    return (dispatch) => {
        firebase.auth.signInWithEmailAndPassword(email, password).then((authUser) => {
            dispatch({ type: 'SET_USER_DATA', payload: authUser })
        });
    }
}

export function logout(user, token){
    return (dispatch) => {
        dispatch({type: 'LOG_OUT'});
        firebase.auth.signOut();
    }
}

export function fetchYouTubeToken(){
    const userID = localStorage.getItem('userID');
    const YTtoken = localStorage.getItem('YTtoken');

    console.log(userID, YTtoken);

    return (dispatch) => {
        if(YTtoken != null){
            dispatch({type: 'SET_YOUTUBE_TOKEN_AND_AUTHED', payload: YTtoken})     
        }else if(userID != null){
            firebase.database.ref('/users/' + userID).once('value', (result) => { 
                if(result.val() != null) {   
                const token = result.val().YouTubeToken;
                console.log(token);
                if(token != null) {
                    localStorage.setItem('YTtoken', token);
                    dispatch({type: 'SET_YOUTUBE_TOKEN_AND_AUTHED', payload: token})
                }
                }
            })
        }
    }
}