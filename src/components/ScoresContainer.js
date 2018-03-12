import React, {Component} from 'react';
import axios from 'axios';

export default class ScoresContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scores:[],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/scores.json')
    .then(response => {
      console.log(response);
      this.setState({scores: response.data})
    })
    .catch(error => console.log(error));
  }

  render() {
    return(
      <div className='scoresContainer' >
        {this.state.scores.map((score) => {
          return(
            <div key={score.id}>
              <div>{score.strokes}</div>
              <div>{score.user}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
