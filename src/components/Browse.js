import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourses, getArticles } from '../actions';

class Browse extends Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getArticles();
  }

  render() {
    const { articles, courses } = this.props;

    return (
      <div>
        <div>
          <h2>Courses</h2>
          {courses.length === 0 ? (
            <h1>Loading courses...</h1>
          ) : (
            courses.map(course => (
              <h1 key={course.id}>Course title: {course.title}</h1>
            ))
          )}
        </div>

        <div>
          <br />
          <h2>Articles</h2>
          {articles.length === 0 ? (
            <h1>Loading articles...</h1>
          ) : (
            articles.map(article => (
              <h1 key={article.created}>Article title: {article.title}</h1>
            ))
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('STATE', state);
  return {
    courses: state.browse.courses,
    articles: state.browse.articles
  };
};

export default connect(
  mapStateToProps,
  { getCourses, getArticles }
)(Browse);
