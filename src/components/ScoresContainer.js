import React, {Component} from 'react';
import axios from 'axios';
import ScoreForm from './ScoreForm';
import update from 'immutability-helper';
import ScoresList from './ScoresList';


export default class ScoresContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastCall: null,
      selectedPlayer: null,
      userScores: [],
      userHandicap: ''
    };
  }

  // componentDidMount() {
  //   axios.get(`http://localhost:3001/api/v1/users/${this.props.currentUser.id}/scores.json`)
  //   .then(response => {
  //     this.setState({scores: response.data})
  //   })
  //   .catch(error => console.log(error));
  // }


  selectPlayer(){
    this.setState( {selectedPlayer: this.refs.playerSelector.value});
  }

  componentDidUpdate() {
      const doIt = (this.state.selectedPlayer == this.state.lastCall);

      doIt == true ?
      console.log('stop infinite loop') :
        axios.get(`http://localhost:3001/api/v1/users/${this.state.selectedPlayer}/scores`)
        .then(response => {
            const scores = response.data.reverse();
            const handicap = this.calculateHandicap(scores);
            this.setState({userScores: scores, lastCall: this.state.selectedPlayer, userHandicap: handicap})
          })
          .catch(error => console.log(error))
  }




  calculateHandicap(scores) {
    switch (scores.length > 5) {
      case true:
        const diffs = scores.map((score) => {
          return(
            (score.strokes-score.course.rating)*113 / score.course.slope
          );

        })
        diffs.sort();
        return Math.round(diffs[0] * 10)/10;

        break;
        default:
        return '5 scores required';
    }
  }

  render() {
    var playerOptions = (this.props.users.map((user) => {
      return <option key={user.id} value={user.id}>{user.name}</option> ;
    }));
    return(
      <div className='scoresContainer'>
        <header>
          <h3>PLAYER STATISTICS</h3>
        </header>
        <div className='scoresBox' >
          <div className='leftSideScoreBox'>
            <select className='selectUser' ref='playerSelector' onChange={(e) => { this.selectPlayer(); } }>
              <option value="" disabled selected>Select Player</option>
              {playerOptions}
            </select>
            <h4>Current Handicap</h4>

              <h2>{this.state.userHandicap}</h2>
        
          </div>
          <div className='rightSideScoreBox'>
            <ScoreForm courseList={this.props.courseList} selectedPlayer={this.state.selectedPlayer} updateScores={this.componentDidUpdate}/>
            {
              this.state.selectedPlayer ?
              <ScoresList userScores={this.state.userScores} /> :
              <p>Select a Player</p>
            }
          </div>
        </div>
      </div>
    );
  }
}
