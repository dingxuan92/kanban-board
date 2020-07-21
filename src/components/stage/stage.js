import React from 'react';
import './stage.css';

import Task from '../task/task';

const Stage = ({ name, stageId, tasks }) => {
  return (
    <div
      className="stage"
      data-testid={`stage-${stageId}`}>
      <h2>{name}</h2>


    </div>
  );
};

export default Stage;
