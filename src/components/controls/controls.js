import React, { useState } from "react";
import "./controls.css";

const Controls = ({
  addTask,
  moveForward,
  moveBackward,
  deleteTask,
  selectedTask,
}) => {
  const [taskName, setTaskName] = useState("");

  const handleChange = (event) => {
    setTaskName(event.target.value);
  };

  const clickAddTaskButton = (e) => {
    addTask(taskName);
    setTaskName("");
  };

  return (
    <div className="controls">
      <div className="header">
        <h1 style={{ margin: "0px", paddingTop: "15px" }}>Controls</h1>
      </div>
      <div className="control-buttons">
        <input
          data-testid="new-task-name-input"
          placeholder="New task name"
          onChange={handleChange}
          value={taskName}
        ></input>
        <button
          data-testid="create-task-btn"
          type="button"
          className="buttons"
          disabled={!taskName}
          onClick={(e) => clickAddTaskButton(e)}
        >
          Create
        </button>
        <div>
          <input
            data-testid="selected-task-field"
            style={{ marginTop: "10px" }}
            placeholder="Selected task name"
            value={selectedTask ? selectedTask.name : ""}
            readOnly
          ></input>
          <button
            type="button"
            data-testid="move-back-btn"
            className="buttons"
            disabled={
              !selectedTask || (selectedTask && selectedTask.stageId === 0)
            }
            onClick={() => moveBackward()}
          >
            Move back
          </button>
          <button
            type="button"
            data-testid="move-forward-btn"
            className="buttons"
            disabled={
              !selectedTask || (selectedTask && selectedTask.stageId === 3)
            }
            onClick={() => moveForward()}
          >
            Move forward
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            className="buttons"
            onClick={() => deleteTask()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
