import React, {Component} from 'react';
import axios from 'axios';

export default class CourseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.course.name,
      rating: this.props.course.rating,
      slope: this.props.course.slope
    }
  }

  handleInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleBlur = () => {
    const course = {name: this.state.name, rating:this.state.rating, slope:this.state.slope }
    axios.put(
      `http://localhost:3001/api/v1/courses/${this.props.course.id}`,
      {course: course})
    .then(response => {
      this.props.updateCourse(response.data)
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className='courseTile'>
        <form onBlur={this.handleBlur}>
          <input className='input' type='text' name='name' placeholder='Course Name & Tees'
            value={this.state.name} onChange={this.handleInput} />
          <input className='input' name='rating' placeholder='course rating' value={this.state.rating} onChange={this.handleInput} />
          <input className='input' name='slope' placeholder='course slope' value={this.state.slope} onChange={this.handleInput} />
        </form>
      </div>
    );
  }
}
