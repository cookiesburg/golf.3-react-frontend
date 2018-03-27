import React, { Component } from 'react';
import axios from 'axios';
import UserTile from './UserTile';
import UserForm from './UserForm';
import update from 'immutability-helper';
import ScoresContainer from './ScoresContainer';
import CoursesContainer from './CoursesContainer';

export default class UsersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users:[],
      editingUserId: null,
      courseList: [],
    }
  }

  updateCourseList = (courses) => {
    this.setState({ courseList: courses});
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users.json')
    .then(response => {
      this.setState({users: response.data})
    })
    .catch(error => console.log(error));
  }

  addNewUser = () => {
    axios.post('http://localhost:3001/api/v1/users', {user: {name: ''}})
    .then(response => {
      const users = update(this.state.users, { $splice: [[0, 0, response.data]]})
      this.setState({users: users, editingUserId: response.data.id})
    })
    .catch(error => console.log(error));
  }

  updateUser = (user) => {
    const userIndex = this.state.users.findIndex(x => x.id === user.id)
    const users = update(this.state.users, {[userIndex]: { $set: user }})
    this.setState({users})
  }

  deleteUser = (id) => {
    axios.delete(`http://localhost:3001/api/v1/users/${id}`)
    .then(response => {
      const userIndex = this.state.users.findIndex(x => x.id === id)
      const users = update(this.state.users, { $splice: [[userIndex, 1]]})
      this.setState({users: users})
    })
    .catch(error => console.log(error));
  }

  enableEditing = (id) => {
    this.setState({editingUserId: id})
  }


  render() {
    return (
      <div className='homeContainer'>
      <ScoresContainer users={this.state.users} currentUser={this.state.currentUser} courseList={this.state.courseList} scores={this.state.scores} userHandicap={this.state.userHandicap} />
      <CoursesContainer passCourseList={this.updateCourseList} />
        <header>
        <h3>Current Friends</h3>
        </header>
        <div className='usernamesContainer'>
          <div>
            <button className='newUserButton' onClick={this.addNewUser} >+</button>
          </div>
          {this.state.users.map((user) => {
            if(this.state.editingUserId === user.id) {
              return( <UserForm user={user} key={user.id} updateUser={this.updateUser} /> );
            } else {
              return( <UserTile user={user} currentUser={this.state.currentUser} key={user.id} onClick={this.enableEditing}
                      onDelete={this.deleteUser} /> );
            }
          })}
        </div>
      </div>
    );
  }
}
