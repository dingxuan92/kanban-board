import React, { useState } from 'react';
import './controls.css'

const Controls = ({addTask, moveForward, moveBackward, deleteTask, selectedTask}) => {
  const [taskName, setTaskName] = useState("");

  const handleChange = (event) => {
    setTaskName(event.target.value);
  }

  const clickAddTaskButton = (e) => {
    addTask(taskName);
    setTaskName("");
  }

  return (
    <div className="controls">
      <div className="header">
        <h1 style={{margin: "0px", paddingTop: "15px"}}>Controls</h1>
      </div>
      <div className="control-buttons">
        <input name="new-task-name" placeholder="New task name" onChange={handleChange} value={taskName}></input>
        <button type="button" className="buttons" onClick={(e) => clickAddTaskButton(e)}>Create</button>
        <div>
          <input style={{ marginTop: "10px"}} placeholder="Click on an existing task" value={selectedTask ? selectedTask.name : ""} readOnly></input>
          <button type="button" className="buttons" onClick={() => moveBackward()}>Move back</button>
          <button type="button" className="buttons" onClick={() => moveForward()}>Move forward</button>
          <button type="button" className="buttons" onClick={() => deleteTask()}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Controls;
