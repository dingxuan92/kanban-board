import React from 'react';
import './task.css';

const taskNameToId = name => {
  return `task-${name}`;
}

const Task = ({ name }) => {
  return (
    <div
      data-testid={taskNameToId(name)}
    >
    <h4>{name}</h4>


    </div>
  );
}

export default Task;
