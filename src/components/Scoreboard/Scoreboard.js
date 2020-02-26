import React from "react";

import "./Scoreboard.css";
import EntriesApi from "../../apis/dbEntries";

class Scoreboard extends React.Component {
  state = { results: [] };

  componentDidMount() {
    this.fromMongo();
  }

  async fromMongo() {
    let results = await EntriesApi.getEntries();
    results = results.sort((a, b) => b.score - a.score);
    this.setState({results:results});
  }

  render() {
    console.log(this.state);

    let position = 1;
    let content = this.state.results.map(
      value => 
      
        <tr className="row">
          <td className="cell">{position++}.</td>
          <td className="cell">{value.name}</td>
          <td className="cell">{value.score}</td>
          <td className="cell">{
              value.date.substring(0, value.date.lastIndexOf('.')).replace('T', ' ')}</td>
        </tr>
    );

    return (
      <div className="mainWrapper">
        <h2 id="header"> High Scores </h2>
        
        <table className="board">
          
          <thead>
            <tr className="header">
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
            </thead>

            <tbody>
              {content}
            </tbody>  

        </table>
      </div>
    );
  }
}

export default Scoreboard;