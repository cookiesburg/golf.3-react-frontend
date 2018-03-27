import React, {Component} from 'react';

export default class CourseTile extends Component {
  handleClick = () => { this.props.onClick(this.props.course.id) }
  handleDelete = () => { this.props.onDelete(this.props.course.id) }

  render() {
    return (
      <tr className='courseTile'>
        <td onClick={this.handleClick}><strong>{this.props.course.name}</strong></td>
        <td onClick={this.handleClick}>rating: {this.props.course.rating}</td>
        <td onClick={this.handleClick}>slope: {this.props.course.slope}
        <span className='deleteButton' onClick={this.handleDelete}>x</span>
        </td>
      </tr>
    );
  }
}
