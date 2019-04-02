import React, { Component } from 'react';
import styled from 'styled-components';
import { customWrapper, customLayout } from './mixins';
import { connect } from 'react-redux';
import { getPosts } from '../actions';

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
`;

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
    width: 130px;
    margin-right: 20px;
  }
  font-size: 5rem;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  align-content: flex-start;
  // max-width: 300px;
  margin-bottom: 50px;
`;

const Cards = styled.div`
  ${customLayout('space-between')}
  flex-wrap: wrap;
  width: 100%;
  margin: 10px 0 40px;
`;

const Card = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 6px;
  width: 30%;
  height: 350px;
  background-color: #fff;
  cursor: pointer;
  position: relative;

  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 180px;
  }
  @media (max-width: 1092px) {
    width: 45%;
  }
  @media (max-width: 692px) {
    width: 100%;
  }
  h1 {
    // border: 1px solid red;
    height: 50px;
    margin: 10px 0;
    padding: 0 3%;
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 25px;
    word-break: break-word;
    overflow: hidden;
  }
  p {
    padding: 0 3%;
    font-size: 1.2rem;
    line-height: 20px;
    color: #6d767e;
  }
  margin-bottom: 30px;
`;

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {
          id: 1,
          title: 'Complete Python Bootcamp: Learn Python Programming and Code',
          description:
            'Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!',
          thumbnail_url:
            'https://udemy-images.udemy.com/course/480x270/567828_67d0.jpg'
        },
        {
          id: 2,
          title: 'Complete Java Masterclass (Updated for Java 10)',
          description:
            'Learn Java In This Course And Become a Computer Programmer. Obtain valuable Core Java Skills And Java Certification',
          thumbnail_url:
            'https://udemy-images.udemy.com/course/480x270/533682_c10c_4.jpg'
        },
        {
          id: 3,
          title: 'Microsoft Excel - Excel from Beginner to Advanced',
          description:
            'Excel with this A-Z Microsoft Excel Course. Microsoft Excel 2010, Excel 2013, Excel 2016',
          thumbnail_url:
            'https://udemy-images.udemy.com/course/480x270/793796_0e89.jpg'
        }
      ],
      articles: [
        {
          id: 1,
          title:
            'A practical guide to learning front end development for beginners',
          description:
            'I started my coding journey in spring 2018, a bit less than one year ago. I earned some programming skills since that time but still, I understand there are many more things to learn ahead. Anyway, I…',
          thumbnail_url:
            'https://cdn-images-1.medium.com/max/1200/0*TtYYyhF4qZTk2Bkj'
        },
        {
          id: 2,
          title:
            "What I've learned about front-end development from age 12 to 22",
          description:
            "10 years ago, I made my first website. Now, my apps have over 300,000 users. Here's what I learned.",
          thumbnail_url:
            'https://cdn-images-1.medium.com/max/1200/1*xGnfXR-yLw17SStwT7v8wQ.png'
        },
        {
          id: 3,
          title: 'Learn the Dropbox API in 5 minutes',
          description:
            "This article will teach you the bare minimum you need to know in order to start creating apps on top of the Dropbox API. Once you've read it, you can also check out our free course on the Dropbox API…",
          thumbnail_url:
            'https://cdn-images-1.medium.com/max/1200/1*KOiao8Wi7g8KSNP2HfxssA.png'
        }
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
                    <img src={course.thumbnail_url} alt="" />
                    <div>
                      <h1>{course.title}</h1>
                      <p>{course.description}</p>
                    </div>
                  </Card>
                ))}
              </Cards>
              <h1>My Articles: {this.state.articles.length}</h1>
              <Cards>
                {this.state.articles.map(article => (
                  <Card>
                    <img src={article.thumbnail_url} alt="" />
                    <div>
                      <h1>{article.title}</h1>
                      <p>{article.description}</p>
                    </div>
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
    // posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(UserProfile);
