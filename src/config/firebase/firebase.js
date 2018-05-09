import firebase from 'firebase'

import store from '../store'

const config = {
    apiKey: "AIzaSyD4lWWQW40sgn8O4I78Q5SkK8OM6ULI6y8",
    authDomain: "datalytics-202215.firebaseapp.com",
    databaseURL: "https://datalytics-202215.firebaseio.com",
    projectId: "datalytics-202215",
    storageBucket: "",
    messagingSenderId: "334188807296"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const googleProvider =  new firebase.auth.GoogleAuthProvider();
const database = firebase.database();

const isAuthenticated = () => {
    return !!auth.currentUser || !!localStorage.getItem("user");
}

const isYoutubeAuthed = () => {
    return !localStorage.getItem('YTtoken');
}

export {auth, database, isAuthenticated, isYoutubeAuthed};