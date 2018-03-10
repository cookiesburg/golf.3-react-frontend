import React, {Component} from 'react';

export default class CourseTile extends Component {
  handleClick = () => { this.props.onClick(this.props.course.id) }
  handleDelete = () => { this.props.onDelete(this.props.course.id) }

  render() {
    return (
      <div className='courseTile'>
        <span className='deleteButton' onClick={this.handleDelete}>x</span>
        <h3 onClick={this.handleClick}>{this.props.course.name}</h3>
        <p onClick={this.handleClick}>rating: {this.props.course.rating}</p>
        <p onClick={this.handleClick}>slope: {this.props.course.slope}</p>
      </div>
    );
  }
}
