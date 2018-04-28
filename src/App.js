import React, { Component } from 'react'; 


import Navigation from './components/navbar/navbar';

import './App.css';
import Sidebar from './components/sidebar/sidebar';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navigation />
        <Sidebar />
      </div>
    );
  }
}

export default App;
