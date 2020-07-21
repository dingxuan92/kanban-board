import React from 'react';
import './board.css';

import Stage from '../stage/stage';

const Board = ({ stagesNames, stagesTasks }) => {
  console.log(stagesNames);
  return (
    <div className="board">
      <div className="header">
        <h1>Kanban board</h1>
      </div>
      <div className="stages">
        <Stage name={stagesNames[0]} stageId="0"/>
        <Stage name={stagesNames[1]} stageId="1"/>
        <Stage name={stagesNames[2]} stageId="2"/>
        <Stage name={stagesNames[3]} stageId="3"/>
      </div>
    </div>
  );
}

export default Board;
