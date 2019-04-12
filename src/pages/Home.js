import React, { Component } from 'react';
import styled from 'styled-components';
import openSocket from 'socket.io-client';
import { customWrapper } from '../components/mixins';
import { post as URL } from '../services/baseURL';
import { connect } from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      search: '',
      posts: []
    };
    this.username = props.auth.username;
    this.user_id = props.auth.id;
    this.socket = openSocket(URL);
  }

  componentDidMount() {
    this.socket.on('comments', msg => {
      if (msg.action === 'create') {
        const updated_state = this.state.posts.map((post, index) => {
          if (post.post_id === msg.post_id) {
            post.comments.push(msg);
          }
          return post;
        });
        console.log('\n updated post', updated_state);
        this.setState({ posts: updated_state });
      }
    });

    axios
      .get(`${URL}/api/users/newsfeed`)
      .then(res => {
        console.log('axios res', res.data);
        this.setState({ posts: res.data.newResponse });
      })
      .catch(err => console.log(err));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event, post_id) => {
    const body = event.target.value;

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
  };

  render() {
    const posts = this.state.posts.map((post, index) => {
      return (
        <div key={index} className="post">
          <div className="post-user-info">
            <img src={`${post.profile_picture}`} alt="user_profile_pic" />
            <div>
              <h2>{post.username}</h2>
              <Moment className="post-date" fromNow>
                {post.created_at}
              </Moment>
            </div>
            <div>
              <hr />
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
            <div className="add-comment">
              <img src={this.props.auth.profile_picture} alt="" />
              <textarea
                placeholder="Enter a comment..."
                type="text"
                onKeyUp={e => this.handleSubmit(e, post.post_id)}
              />
            </div>
            {post.comments.map((comment, index) => {
              return (
                <div key={index} className="comments">
                  <h2>{comment.username}:</h2>
                  <span>{comment.content}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
    return <Container>{posts}</Container>;
  }
}

const Container = styled.div`
  ${customWrapper('100%', '0 auto')}
  .post {
    margin: auto;
    margin-bottom: 40px;
    border: 1px solid lightgray;
    border-radius: 8px;
    /* max-width: 700px; */
    background: #fff;
  }
  .post-user-info {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    /* border: 1px solid red; */
    border-bottom: 1px solid lightgray;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
    h2 {
      font-weight: 500;
      margin-bottom: 3px;
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
      margin-bottom: 20px;
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
        ::placeholder {
          /* border-bottom: 1px solid lightgrey; */
        }
        :focus {
          border: 1px solid #3f65f2;
          outline: none;
        }
      }
    }
    .comments {
      display: flex;
      margin-bottom: 10px;
      h2 {
        margin-right: 10px;
        color: #222;
        font-weight: 400;
      }
      span {
        color: #222;
        opacity: 0.9;
        word-break: break-all;
      }
    }
  }
`;

const SPAN = styled.span`
  font-weight: bold;
  font-size: 2rem;
`;

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Home);
