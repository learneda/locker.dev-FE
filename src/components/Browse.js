import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourses, getArticles, saveLink } from '../actions';

import { Tab, Tabs } from 'grommet';
import { Wrapper, customLayout } from './mixins';
import styled from 'styled-components';
import { ReactComponent as Add } from '../assets/svg/add-icon.svg';

class Browse extends Component {
  componentDidMount() {
    this.props.getCourses();
    this.props.getArticles();
  }

  render() {
    const { articles, courses } = this.props;

    return (
      <Wrapper>
        <BrowseContainer>
          <h2>Browse</h2>

          <Tabs justify="start" alignSelf="center">
            <Tab title="Courses">
              <Cards>
                {courses.length === 0 ? (
                  <h3>Loading courses...</h3>
                ) : (
                  courses.map(course => (
                    <Card key={course.course_id}>
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={course.thumbnail} alt="course-thumbnail" />
                        <Add className="save-icon" />
                        <h3>{course.title}</h3>
                        <p>{course.description}</p>
                      </a>
                    </Card>
                  ))
                )}
              </Cards>
            </Tab>

            <Tab title="Articles">
              <Cards>
                {articles.length === 0 ? (
                  <h3>Loading articles...</h3>
                ) : (
                  articles.map(article => (
                    <Card key={article.created}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={article.thumbnail} alt="article-thumbnail" />
                        <Add className="save-icon" />
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                      </a>
                    </Card>
                  ))
                )}
              </Cards>
            </Tab>
          </Tabs>
        </BrowseContainer>
      </Wrapper>
    );
  }
}

const BrowseContainer = styled.div`
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`;

const Cards = styled.div`
  // border: 1px solid red;
  ${customLayout('space-between')}
  flex-wrap: wrap;
  width: 100%;
  margin: 40px 0;
`;

const Card = styled.div`
  border: 1px solid lightgrey;
  border-radius: 6px;
  width: 30%;
  height: 350px;
  margin-bottom: 30px;
  background-color: #fff;
  cursor: pointer;
  position: relative;

  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 180px;
  }

  .save-icon {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  h3 {
    // border: 1px solid red;
    height: 50px;
    margin: 10px 0;
    padding: 0 2%;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 25px;
    word-break: break-word;
    overflow: hidden;
  }

  p {
    padding: 0 2%;
    font-size: 1.2rem;
    line-height: 20px;
    color: #6d767e;
  }

  &:hover {
    h3 {
      text-decoration: underline;
    }
  }
`;

const mapStateToProps = state => {
  console.log('STATE', state);
  return {
    courses: state.browse.courses,
    articles: state.browse.articles,
    posts: state.post.posts
  };
};

export default connect(
  mapStateToProps,
  { getCourses, getArticles, saveLink }
)(Browse);
