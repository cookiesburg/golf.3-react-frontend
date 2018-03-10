import React, { Component } from 'react';
import axios from 'axios';
import UserTile from './UserTile';
import UserForm from './UserForm';
import update from 'immutability-helper';

export default class UsersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users:[],
      editingUserId: null,
    }
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
      console.log(response)
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
      <div className='users-container'>
        <div>
          <button className='newUserButton' onClick={this.addNewUser} >+</button>
        </div>
        {this.state.users.map((user) => {
          if(this.state.editingUserId === user.id) {
            return( <UserForm user={user} key={user.id} updateUser={this.updateUser} /> );
          } else {
            return( <UserTile user={user} key={user.id} onClick={this.enableEditing}
                      onDelete={this.deleteUser} /> );
          }
        })}
      </div>
    );
  }
}
