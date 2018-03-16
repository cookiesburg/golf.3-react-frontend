import React, {Component} from 'react';

export default class CourseTile extends Component {
  handleClick = () => { this.props.onClick(this.props.course.id) }
  handleDelete = () => { this.props.onDelete(this.props.course.id) }

  render() {
    return (
      <div className='courseTile'>
        <span className='deleteButton' onClick={this.handleDelete}>x</span>
        <p onClick={this.handleClick}><strong>{this.props.course.name}</strong></p>
        <p onClick={this.handleClick}>rating: {this.props.course.rating}</p>
        <p onClick={this.handleClick}>slope: {this.props.course.slope}</p>
      </div>
    );
  }
}
