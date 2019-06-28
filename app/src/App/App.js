import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.scss';
import Map from './Map/Map';
import Sidebar from './Sidebar/Sidebar';
import BarChart from './BarChart';

class App extends Component {
  render() {
    return (
      <div className="App columns">
        <div className="column is-two-thirds"><Sidebar/></div>
          <div className="column is-two-thirds"><Map/></div>
      </div>
    );
  }
}

export default App;
