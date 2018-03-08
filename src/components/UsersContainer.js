import React, { Component } from 'react';
import axios from 'axios';
import UserTile from './UserTile';

export default class UsersContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users:[]
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/users.json')
    .then(response => {
      console.log(response);
      this.setState({users: response.data})
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className='users-container'>
        {this.state.users.map((user) => {
          return(
            <UserTile user={user} key={user.name} />
          );
        })}
      </div>
    );
  }
}
