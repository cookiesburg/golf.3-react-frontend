import React, { Component } from 'react';

export default class ScoresList extends Component {
  render() {
    return(
      <table>
        <thead>
          <tr>
            <th>score</th>
            <th>course</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>

          {
            this.props.userScores.map((score) => {
              let timestamp = score.created_at;
              let day = timestamp.slice(5, 10);
              return(
                <tr key={score.created_at}>
                  <td>{score.strokes}</td>
                  <td>{score.course.name}</td>
                  <td>{day}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
