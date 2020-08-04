import React from "react";
import "./board.css";

import Stage from "../stage/stage";

const Board = ({ stagesNames, stagesTasks, clickTask }) => {
  console.log(stagesNames);
  return (
    <div className="board">
      <div className="header">
        <h1>Kanban board</h1>
      </div>
      <div className="stages">
        {stagesNames &&
          stagesNames.map((stage, index) => {
            return (
              <Stage
                key={index}
                name={stagesNames[index]}
                stageId={index}
                tasks={stagesTasks[`stage-${index}`]}
                clickTask={(e, stageId) => clickTask(e, stageId)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Board;
