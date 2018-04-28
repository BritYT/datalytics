import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyD4lWWQW40sgn8O4I78Q5SkK8OM6ULI6y8",
    authDomain: "datalytics-202215.firebaseapp.com",
    databaseURL: "https://datalytics-202215.firebaseio.com",
    projectId: "datalytics-202215",
    storageBucket: "",
    messagingSenderId: "334188807296"
};
firebase.initializeApp(config);
export default firebase;