import React from "react";
import "./task.css";

const taskNameToId = (name) => {
  return `task-${name}`;
};

const Task = ({ name, clickTask }) => {
  return (
    <div
      data-testid={taskNameToId(name)}
      className="task"
      onClick={(e) => clickTask(e)}
    >
      {name}
    </div>
  );
};

export default Task;
