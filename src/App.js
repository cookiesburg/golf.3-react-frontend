import React, { Component } from 'react';
import './App.css';
import UsersContainer from './components/UsersContainer';
import CoursesContainer from './components/CoursesContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">golf tracker</h1>
        </header>
        <UsersContainer />
        <CoursesContainer />
      </div>
    );
  }
}

export default App;
