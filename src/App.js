import React, { Component } from 'react';
import './App.css';

import Controls from './components/controls/controls';
import Board from './components/board/board';


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
        <Controls />
        <Board stagesNames={this.stagesNames}/>

      </div>
    );
  }
}

export default App;
