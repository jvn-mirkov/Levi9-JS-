import React from 'react';
import './App.css';
import ScoreBoard from '../Scoreboard/Scoreboard';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <Scoreboard />
      </div>
    );
  }
}

export default App;