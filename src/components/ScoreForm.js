import React, { Component } from 'react';
import axios from 'axios';

export default class ScoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strokes: null,
      selectedCourse: null,
    };

  }

  selectCourse(){
    console.log(this.refs.courseSelector.value);
    this.setState( {selectedCourse: this.refs.courseSelector.value} );
  }

  enterStrokes(){
    console.log(this.refs.typeStrokes.value);
    this.setState({strokes: this.refs.typeStrokes.value});
  }

  handleSubmit = () => {
    const score = { strokes:this.state.strokes, user_id: this.props.currentUser, course_id: this.state.selectedCourse}
    axios.post(
      `http://localhost:3001/api/v1/scores`, {score: score})
    .then(response => {
      this.props.updateScores(response.data)

    })
    .catch(error => console.log(error))
  }

  render() {
    var courseOptions = (this.props.courseList.map((course) => {
      return <option key={course.id} value={course.id}>{course.name}</option> ;
    }));
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref='typeStrokes' onChange={(e) => {this.enterStrokes(); } } />
        <select ref='courseSelector' onChange={(e) => { this.selectCourse(); } }>{courseOptions}</select>
      </form>
    );
  }
}
