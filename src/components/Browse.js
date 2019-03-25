import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourses } from '../actions';

class Browse extends Component {
  componentDidMount() {
    this.props.getCourses();
  }

  render() {
    return (
      <div>
        {this.props.courses.map(course => (
          <h1 key={course.id}>Course title: {course.title}</h1>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('STATE', state);
  return {
    courses: state.udemy.courses
  };
};

export default connect(
  mapStateToProps,
  { getCourses }
)(Browse);
