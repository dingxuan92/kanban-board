import React from 'react';
import './stage.css';

import Task from '../task/task';

const Stage = ({ name, stageId, tasks, clickTask }) => {
  return (
    <div
      className="stage"
      data-testid={`stage-${stageId}`}>
      <h2>{name}</h2>
      {
        tasks && tasks.map((item, index) => {
          return <Task key={index} name={item.name} clickTask={(e) => clickTask(e, stageId)}/>
        })
      }


    </div>
  );
};

export default Stage;
