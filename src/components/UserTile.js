import React, {Component} from 'react';

export default class UserTile extends Component {
  constructor(props) {
    super(props);
  }


  /*
    constructor to keep state of currentUser so I can style the div differently???
  */

  handleClick = () => { this.props.onClick(this.props.user.id) }
  handleDelete = () => { this.props.onDelete(this.props.user.id) }

  render() {
    return(
      <div className = 'userTile'>
        <span className='deleteButton' onClick={this.handleDelete}>x</span>
        <h4 onClick={this.handleClick}>{this.props.user.name}</h4>
      </div>
    );
  }
}
