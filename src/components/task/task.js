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


    </div>
  );
}

export default Task;
