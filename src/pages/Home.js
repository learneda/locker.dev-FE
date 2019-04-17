import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import openSocket from 'socket.io-client';
import axios from 'axios';
import styled from 'styled-components';
import MoreBtn from '../components/utils/MoreBtn';
import { customWrapper, customLayout } from '../components/mixins';
import { post as URL } from '../services/baseURL';
import { ReactComponent as Loading } from '../assets/svg/circles.svg';
import ContentLoader, { Facebook } from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    height={475}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    style={{ minWidth: '100%', maxWidth: '700px', width: '100%' }}
  >
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
    <rect x="3" y="68" rx="5" ry="5" width="400" height="400" />
  </ContentLoader>
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      search: '',
      posts: [],
      commentsToRender: -2
    };
    this.username = props.auth.username;
    this.user_id = props.auth.id;
    this.socket = openSocket(URL);
  }

  componentDidMount() {
    this.socket.on('comments', msg => {
      const updated_state = this.state.posts.map((post, index) => {
        if (post.post_id === msg.post_id) {
          post.comments.push(msg);
        }
        return post;
      });
      this.setState({ posts: updated_state });
    });
    this.getNewsFeed();
  }

  getNewsFeed = () => {
    axios
      .get(`${URL}/api/users/newsfeed`)
      .then(res => {
        this.setState({ posts: res.data.newResponse });
      })
      .catch(err => console.log(err));
  };

  handleSubmit = (event, post_id) => {
    const body = event.target.value.trim();
    if (event.keyCode === 13 && body.length === 0) {
      event.target.value = '';
    }
    if (body) {
      const comment = {
        action: 'create',
        content: body,
        user_id: this.user_id,
        post_id: post_id,
        username: this.username
      };

      if (event.keyCode === 13 && body) {
        this.socket.emit('comments', comment);
        event.target.value = '';
      }
    }
  };

  handleMoreComments = e => {
    e.preventDefault();
    this.setState({
      commentsToRender: this.state.commentsToRender - 3
    });
    console.log('COMMENT TO RENDER', this.state.commentsToRender);
  };

  render() {
    const posts = this.state.posts.map((post, index) => {
      return (
        <div key={index} className="post">
          <div className="post-user-info">
            <Link to={`/profile/${post.user_id}`}>
              <img src={`${post.profile_picture}`} alt="user_profile_pic" />
            </Link>
            <div>
              <h2>{post.username}</h2>
              <Moment className="post-date" fromNow>
                {post.created_at}
              </Moment>
            </div>
          </div>
          <div className="post-content">
            {post.thumbnail_url ? (
              <img src={`${post.thumbnail_url}`} alt="post_thumbnail" />
            ) : null}
            <div className="title-and-description">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          </div>
          <div className="comments-container">
            <div className="comment-box">
              {post.comments.length - 1 <
              Math.abs(this.state.commentsToRender) ? null : (
                <button
                  className="show-more-btn"
                  onClick={this.handleMoreComments}
                >
                  show more comments
                </button>
              )}
              {post.comments
                .slice(this.state.commentsToRender)
                .map((comment, index) => {
                  if (comment.user_id === this.user_id) {
                    return (
                      <div key={index} className="comment">
                        <div className="comment-text">
                          <h2>{comment.username}:</h2>
                          <span>{comment.content}</span>
                        </div>
                        <MoreBtn
                          getNewsFeed={this.getNewsFeed}
                          comment_id={comment.id}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="comment">
                        <h2>{comment.username}:</h2>
                        <span>{comment.content}</span>
                      </div>
                    );
                  }
                })}
            </div>

            <div>
              <form className="add-comment">
                <img src={this.props.auth.profile_picture} alt="" />
                <textarea
                  placeholder="Add a comment..."
                  type="text"
                  onKeyUp={e => this.handleSubmit(e, post.post_id)}
                />
                <button
                  onClick={e => {
                    e.preventDefault();
                    this.handleSubmit(e, post.post_id);
                  }}
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    });
    if (posts.length !== 0) {
      return <Container>{posts}</Container>;
    } else {
      // let noPosts = '';
      // setTimeout(() => {
      //   if (this.state.posts.length === 0) {
      //     noPosts = (
      //       <h3>
      //         No posts found. Create some posts or follow some users to see
      //         their posts here.
      //       </h3>
      //     );
      //   }
      // }, 1500);

      // noPosts = (
      //   <Loader>
      //     <Loading />
      //   </Loader>
      // );
      return (
        <Container style={{ minWidth: '100%' }}>
          <MyLoader />
        </Container>
      );
      // return (
      //   <Container>
      //     {console.log(MyLoader())}
      //     <img src={MyLoader()} alt="" />
      //   </Container>
      // );
      // <h3>
      //   No posts found. Create some posts or follow some users to see their
      //   posts here.
      // </h3>
    }
  }
}

const Loader = styled.div`
  margin: 75px auto;
  text-align: center;
`;

const Container = styled.div`
  ${customWrapper('100%', '0 auto')}
  .post {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    /* margin: auto; */
    margin-bottom: 40px;
    border-radius: 8px;
    /* max-width: 700px; */
    background: #fff;
  }
  .post-user-info {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    border-bottom: 1px solid lightgray;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
    h2 {
      font-weight: 500;
      margin-bottom: -5px;
    }
    .post-date {
      font-size: 1.3rem;
      opacity: 0.8;
    }
  }
  .post-content {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid lightgrey;
    img {
      max-height: 500px;
      width: 100%;
      height: 100%;
    }
  }
  .title-and-description {
    padding: 15px 25px;
    h2 {
      margin-bottom: 10px;
      font-size: 2.6rem;
      font-weight: 500;
      line-height: 1.3;
    }
    p {
      opacity: 0.8;
      line-height: 1.6;
    }
  }
  .comments-container {
    padding: 15px 25px;

    .add-comment {
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }

      textarea {
        resize: none;
        align-items: center;
        padding: 5px;
        width: 100%;
        border-radius: 3px;
        border-color: lightgrey;
        height: 40px;
        font-size: 1.4rem;
        ::placeholder {
          /* border-bottom: 1px solid lightgrey; */
        }
        :focus {
          border: 1px solid #3f65f2;
          outline: none;
        }
      }

      button {
        border: 1px solid transparent;
        background-color: #3f65f2;
        color: white;
        border-radius: 5px;
        font-weight: 700;
        margin-left: 20px;
        padding: 8px 25px;
        font-size: 1.5rem;
      }
    }

    .more_btn {
      display: none;
    }

    .comment-box {
      margin-top: 10px;

      .show-more-btn {
        border: 1px solid transparent;
        color: #3f65f2;
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
        transition: 200ms ease-out;
        &:hover {
          color: #3059f3;
        }

        &:focus {
          outline: none;
        }
      }
    }

    .comment {
      ${customLayout('space-between')}
      margin-bottom: 10px;
      padding: 10px;
      background-color: #f3f4f7;
      border-radius: 5px;

      :nth-child(2) {
        margin-top: 10px;
      }
      &:hover {
        .more_btn {
          display: flex;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: pointer;
        }
      }

      .comment-text {
        h2 {
          margin-right: 10px;
          color: #222;
          font-weight: 700;
          font-size: 1.4rem;
        }
        span {
          color: #222;
          opacity: 0.9;
          /* word-break: break-all; */
          overflow: hidden;
          width: 80%;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Home);
