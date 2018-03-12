import React, {Component} from 'react';
import axios from 'axios';
import CourseTile from './CourseTile';
import CourseForm from './CourseForm';
import update from 'immutability-helper';

export default class CoursesContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses:[],
      editingCourseId: null,
    };

  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/v1/courses.json')
    .then(response => {
      this.setState({courses: response.data})
    })
    .catch(error => console.log(error));
  }

  addNewCourse = () => {
    axios.post('http://localhost:3001/api/v1/courses', {course: {name: '', rating: '', slope: ''}})
    .then(response => {
      const courses = update(this.state.courses, { $splice: [[0, 0, response.data]]})
      this.setState({courses: courses, editingCourseId: response.data.id });
    })
    .catch(error => console.log(error));
  }

  updateCourse = (course) => {
    const courseIndex = this.state.courses.findIndex(x => x.id === course.id)
    const courses = update(this.state.courses, {[courseIndex]: { $set: course }})
    this.setState({courses})
  }

  deleteCourse = (id) => {
    axios.delete(`http://localhost:3001/api/v1/courses/${id}`)
    .then(response => {
      console.log(response)
      const courseIndex = this.state.courses.findIndex(x => x.id === id)
      const courses = update(this.state.courses, { $splice: [[courseIndex, 1]]})
      this.setState({courses: courses})
    })
    .catch(error => console.log(error));
  }

  enableEditing = (id) => {
    this.setState({editingCourseId: id})
  }

  render() {
    return(
      <div className='coursesContainer'>
        <div>
          <button className='addCourseButton' onClick={this.addNewCourse} >+</button>
        </div>
        {this.state.courses.map((course) => {
          if(this.state.editingCourseId === course.id) {
            return(<CourseForm course={course} key={course.id} updateCourse={this.updateCourse} />);
          } else {
            return (<CourseTile course={course} key={course.id} onClick={this.enableEditing}
                      onDelete={this.deleteCourse} />);
          }
        })}
      </div>
    );
  }
}