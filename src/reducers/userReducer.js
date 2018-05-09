import { firebase , auth } from '../config/firebase';



const INITIAL_STATE = {
    user: null,
    isAuthenticated: false, 
    isYouTubeAuthed: false, 
    userID: null,
    youtubeToken: null
}


export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER_DATA':
            if(action.payload != null){
                return {...state, user: action.payload, isAuthenticated: true}
            }
            return state;
        case 'USER_ERROR':
            return 'Error';
        default:
            return state;
        case 'GET_USER_EMAIL': 
            return {...state, user: action.payload.email}
        case 'SIGN_IN': 
            return {...state, user: action.payload, isAuthenticated: true}
        case 'LOG_OUT':
            return {...state, isAuthenticated: false}
        case 'GOT_YOUTUBE_TOKEN': 
            return {...state, isYouTubeAuthed: true} 
        case 'SET_USER_ID':
            return {...state, userID: action.payload}
        case 'SET_YOUTUBE_TOKEN_AND_AUTHED':
            return {...state, isYouTubeAuthed: true, youtubeToken: action.payload}
    }  
    
}