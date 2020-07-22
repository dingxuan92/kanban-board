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
      },
    };
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
  }

  //no time to implement these methods :'(

  addTask(value) {
    if(value === "") return;
    const prevState = Object.assign({}, this.state.stagesTasks);
    prevState["stage-0"].push({
      "data-testid": `task-${value}`,
      "name": value
    })
    this.setState(prevState);
  }

  moveForward() {
    const selectedTask = this.state.selectedTask;
    console.log(selectedTask);
    if(selectedTask && selectedTask.stageId < 3) {
      const prevState = Object.assign({}, this.state.stagesTasks);
      prevState[`stage-${selectedTask.stageId}`] = prevState[`stage-${selectedTask.stageId}`].filter(item => {
        return item.name !== selectedTask.name;
      })
      const newSelectedTask = {
        "name": selectedTask.name,
        "stageId": selectedTask.stageId + 1
      }
      prevState[`stage-${selectedTask.stageId + 1}`].push({
        "data-testid": `task-${selectedTask.name}`,
        "name": selectedTask.name
      })
      this.setState({stagesTasks: prevState, selectedTask: newSelectedTask});
      console.log({stagesTasks: prevState, selectedTask: newSelectedTask});
    }
  }

  moveBackward() {
    const selectedTask = this.state.selectedTask;
    if(selectedTask && selectedTask.stageId > 0) {
      const prevState = Object.assign({}, this.state.stagesTasks);
      prevState[`stage-${selectedTask.stageId}`] = prevState[`stage-${selectedTask.stageId}`].filter(item => {
        return item.name !== selectedTask.name;
      })
      const newSelectedTask = {
        "name": selectedTask.name,
        "stageId": selectedTask.stageId - 1
      }
      prevState[`stage-${selectedTask.stageId - 1}`].push({
        "data-testid": `task-${selectedTask.name}`,
        "name": selectedTask.name
      })
      this.setState({stagesTasks: prevState, selectedTask: newSelectedTask});
    }
  }

  deleteTask() {
    const selectedTask = this.state.selectedTask;
    const prevState = Object.assign({}, this.state.stagesTasks);
    prevState[`stage-${selectedTask.stageId}`] = prevState[`stage-${selectedTask.stageId}`].filter(item => {
      return item.name !== selectedTask.name;
    })
    this.setState({stagesTasks: prevState, selectedTask: null});
  }

  clickTask(e, stageId) {
    this.setState({selectedTask: {name: e.target.innerHTML, stageId: stageId}})
    console.log(stageId);
  }

  render() {
    return (
      <div className="App">
        <Controls selectedTask={this.state.selectedTask} addTask={(value) => this.addTask(value)} moveForward={() => this.moveForward()} moveBackward={() => this.moveBackward()} deleteTask={() => this.deleteTask()}/>
        <Board stagesNames={this.stagesNames} stagesTasks={this.state.stagesTasks} clickTask={(e, stageId) => this.clickTask(e, stageId)}/>
      </div>
    );
  }
}

export default App;
