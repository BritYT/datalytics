import React from 'react';


import './home.css';

import firebase from '../../config/firebase';

class HomePage extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
              Home
            </div>
        );
    }
}

export default HomePage;