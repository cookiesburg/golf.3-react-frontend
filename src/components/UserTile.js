import React, {Component} from 'react';

export default class UserTile extends Component {
  handleClick = () => { this.props.onClick(this.props.user.id) }
  handleDelete = () => { this.props.onDelete(this.props.user.id) }

  render() {
    return(
      <div className='userTile'>
        <span className='deleteUserButton' onClick={this.handleDelete}>x</span>
        <h4 onClick={this.handleClick}>{this.props.user.name}</h4>
      </div>
    );
  }
}
