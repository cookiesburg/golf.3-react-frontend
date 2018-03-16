import React, {Component} from 'react';
import axios from 'axios';
import ScoreForm from './ScoreForm';
import update from 'immutability-helper';

export default class ScoresContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores:[],
    };
  }

  getInitialState() {
    axios.get(`http://localhost:3001/api/v1/users/${this.props.currentUser}/scores.json`)
    .then(response => {
      console.log(response);
      this.setState({scores: response.data})
    })
    .catch(error => console.log(error));
  }

  componentWillReceiveProps() {
    axios.get(`http://localhost:3001/api/v1/users/${this.props.currentUser}/scores.json`)
    .then(response => {
      console.log(response);
      this.setState({scores: response.data})
    })
    .catch(error => console.log(error));
  }

  updateScores = (score) => {
    const scoreIndex = this.state.scores.findIndex(x => x.id === score.id)
    const scores = update(this.state.scores, {[scoreIndex]: { $set: score }})
    this.setState({scores});
  }

  render() {
    return(
      <div className='scoresContainer' >
        <div>
          <h2>{this.props.currentUser}</h2>
          <h3>handicap: {(this.state.scores).length}</h3>
        </div>
        <div className='scoringFormList'>
          <ScoreForm courseList={this.props.courseList} currentUser={this.props.currentUser} updateScores={this.updateScores}/>

          {this.state.scores.map((score) => {
            return(
              <div className='roundsList' key={score.id}>
                <div className='score'>{score.strokes}</div>
                <div className='course'>{score.course_id}</div>
                <div className='diff'>{score.differential}</div>
              </div>
            );
          })}

        </div>
      </div>
    );
  }
}
