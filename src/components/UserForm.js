import React, {Component} from 'react';
import axios from 'axios';

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const name = {name: this.state.name}
    axios.put(
      `http://localhost:3001/api/v1//users/${this.props.user.id}`,
      {user: name}
    )
    .then(response => {
      console.log(response)
      this.props.updateUser(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className='currentUserTile'>
        <form onBlur={this.handleBlur} >
          <input className='input' type='text' name='name' placeholder='Enter Username'
            value={this.state.name} onChange={this.handleInput} />
        </form>
      </div>
    );
  }
}
