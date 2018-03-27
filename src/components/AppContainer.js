import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import CoursesContainer from './CoursesContainer';
import UsersContainer from './UsersContainer';

export default AppContainer extends Component {
  constructor(props) {
  super(props);
  this.state {
    users: [],
    selectedUser: null,
    courses: [],
    scores: [],
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users.json')
    .then(response => {
      this.setState({users: response.data})
    })
    .catch(error => console.log(error));
  }
  

  render() {
    return(
      <div>
        <UsersContainer users={this.state.users} selectedUser={this.state.selectedUser} />
        <ScoresContainer courses={this.state.courses} selectedCourse={this.state.courses} />
        <div className='scoresSection'>
          <ScoringForm selectedUser={this.state.selectedUser} selectedCourse={this.state.selectedCourse} />
          <UserScores scores={this.state.scores} selectedUser={this.state.selectedUser} />
        </div>
      </div>
    );
  }
}
