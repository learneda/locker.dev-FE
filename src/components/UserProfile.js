import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
  font-size: 2rem;
`;

const User = styled.div`
  img {
    border-radius: 50%;
    height: 200px;
    width: 200px;
  }
`;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'https://avatars3.githubusercontent.com/u/28912696?s=400&v=4',
      name: 'Sam',
      courses: ['123', '123'],
      articles: ['1234', '1234']
    };
  }

  // componentDidMount() {
  //   const api = '';
  //   axios
  //     .get(api)
  //     .then(res => {
  //       this.setState({ courses: res.data });
  //     })
  //     .catch(err => console.error(err));
  // }

  render() {
    return (
      <Container>
        <User>
          <img src={this.state.picture} />
          <div>{this.state.name}</div>
        </User>
        <h1>My Courses: {this.state.courses.length}</h1>
        <div>
          {this.state.courses.map(course => (
            <div>{course}</div>
          ))}
        </div>
        <h1>My Articles: {this.state.articles.length}</h1>
        <div>
          {this.state.articles.map(article => (
            <div>{article}</div>
          ))}
        </div>
      </Container>
    );
  }
}

export default UserProfile;
