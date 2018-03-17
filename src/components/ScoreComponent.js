import React, { Component } from 'react';

export default class ScoreComponent extends Component {

  render() {
    return (
      <div className='userScoresList'>
        <div className='score'>{this.props.score.strokes}</div>
        <div className='course'>{this.props.score.course_id}</div>
        <div className='diff'>{this.props.score.differential}</div>
      </div>
    );
  }
}
