import React, { Component } from 'react';
import './App.css';

import Controls from './components/Controls';
import Board from './components/Board';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  render() {
    

    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
