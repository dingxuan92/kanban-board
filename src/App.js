import React, { Component } from 'react';
import './App.css';

import Controls from './components/controls/controls';
import Board from './components/board/board';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //initial states
      stagesTasks: {
        "stage-0": [
          {
            "data-testid": "task-task0",
            "name": "task 0"
          },
          {
            "data-testid": "task-task0",
            "name": "task 0"
          },
          {
            "data-testid": "task-task1",
            "name": "task 1"
          },
          {
            "data-testid": "task-task2",
            "name": "task 2"
          },
          {
            "data-testid": "task-task3",
            "name": "task 3"
          }
        ],
        "stage-1": [
          {
            "data-testid": "task-task4",
            "name": "task 4"
          },
          {
            "data-testid": "task-task5",
            "name": "task 5"
          },
          {
            "data-testid": "task-task6",
            "name": "task 6"
          }
        ],
        "stage-2": [
          {
            "data-testid": "task-task7",
            "name": "task 7"
          },
          {
            "data-testid": "task-task8",
            "name": "task 8"
          }
        ],
        "stage-3": [
          {
            "data-testid": "task-task9",
            "name": "task 9"
          }
        ]
      }
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  render() {


    return (
      <div className="App">
        <Controls />
        <Board stagesNames={this.stagesNames} stagesTasks={this.state.stagesTasks}/>
      </div>
    );
  }
}

export default App;
