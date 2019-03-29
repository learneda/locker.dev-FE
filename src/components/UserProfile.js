import React, { Component } from 'react';
import styled from 'styled-components';
import MetadataParse from './MetadataParse';
import { Wrapper } from './mixins';
import { connect } from 'react-redux';

// const UserWrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   width: 80%;
// `;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  font-size: 2rem;
  h1 {
    font-size: 3.5rem;
    margin: 15px 15px 15px 0;
  }
`;

const SubContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const User = styled.div`
  img {
    border-radius: 50%;
    height: auto;
    width: 150px;
    margin-right: 20px;
  }
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: flex-start;
  max-width: 300px;
  margin-bottom: 50px;
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

const Card = styled.div`
  display: flex;
  width: 30%;
  // width: 500px;
  // height: 720px;
  overflow: hidden;
  border: solid 1px lightgrey;
  @media (max-width: 1092px) {
    width: 45%;
  }
  @media (max-width: 692px) {
    width: 100%;
  }
  // margin: 15px 15px 15px 0;
  p {
    display: none; // CHANGE LATER
  }
  h1 {
    max-height: 24px;
    overflow: hidden;
    font-size: 2.4rem;
    text-align: center;
  }
  margin-bottom: 30px;
  img {
    width: 100%;
    // height: 100%;
    display: block;
    object-fit: fill;
  }
`;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picture: 'https://avatars3.githubusercontent.com/u/28912696?s=400&v=4',
      name: 'Sam',
      courses: [
        'https://www.youtube.com/watch?v=wqhNoDE6pb4',
        'https://www.youtube.com/watch?v=H6u0VBqNBQ8',
        'https://www.youtube.com/watch?v=7co2v8vSaqU'
      ],
      articles: [
        'https://medium.freecodecamp.org/how-to-build-a-cli-tool-in-nodejs-bc4f67d898ec',
        'https://medium.freecodecamp.org/how-i-style-my-websites-with-my-favorite-css-resets-7ace41dbc43d',
        'https://medium.freecodecamp.org/my-experience-with-a-coding-bootcamp-and-whether-it-might-be-right-for-you-5c32b4ed0a8',
        'https://medium.freecodecamp.org/an-animated-guide-to-flexbox-d280cf6afc35'
      ]
    };
  }

  componentDidMount() {
    // const api = '';
    // axios
    //   .get(api)
    //   .then(res => {
    //     this.setState({ courses: res.data });
    //   })
    //   .catch(err => console.error(err));
  }

  render() {
    if (this.props.auth) {
      return (
        <Wrapper>
          <Container>
            <SubContainer>
              <User>
                <img src={this.props.auth.profile_picture} alt="avatar" />
                <div>{this.props.auth.display_name}</div>
              </User>
              <h1>My Courses: {this.state.courses.length}</h1>
              <Cards>
                {this.state.courses.map(course => (
                  <Card>
                    <MetadataParse>
                      <span href={course} />
                    </MetadataParse>
                  </Card>
                ))}
              </Cards>
              <h1>My Articles: {this.state.articles.length}</h1>
              <Cards>
                {this.state.articles.map(article => (
                  <Card
                  // style={{
                  //   flexGrow: this.state.articles.length % 3 == 0 ? '0' : '1'
                  // }}
                  >
                    <MetadataParse>
                      <span href={article} />
                    </MetadataParse>
                  </Card>
                ))}
              </Cards>
            </SubContainer>
          </Container>
        </Wrapper>
      );
    } else {
      return <div>LOADING </div>;
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth
  };
};

export default connect(
  mapStateToProps,
  {}
)(UserProfile);
