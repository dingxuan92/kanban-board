import React, { Component } from 'react';
import './controls.css'

class Controls extends Component {
  render() {
    return (
      <div className="controls">
        <div className="header">
          <h1 style={{margin: "0px", paddingTop: "15px"}}>Controls</h1>
        </div>
        <div className="control-buttons">
          <input placeholder="New task name"></input>
          <button type="button" className="buttons">Create</button>
          <div>
            <input style={{ marginTop: "10px"}}></input>
            <button type="button" className="buttons">Move back</button>
            <button type="button" className="buttons">Move forward</button>
            <button type="button" className="buttons">Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Controls;
