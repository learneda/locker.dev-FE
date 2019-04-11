import React, { Component } from 'react';
import styled from 'styled-components';
import openSocket from 'socket.io-client';
import { customWrapper } from '../components/mixins';
import { post as URL } from '../services/baseURL';
import { connect } from 'react-redux';
import axios from 'axios';

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
        <div key={index}>
          <div>{post.username}</div>
          <img src={`${post.profile_picture}`} alt="user_profile_pic" />
          <img src={`${post.thumbnail_url}`} alt="post_thumbnail" />
          <div>{post.title}</div>
          <div>{post.description}</div>
          <div>
            {post.comments.map((comment, index) => {
              return (
                <h1 key={index} className="comments">
                  {comment.username} {comment.content}
                </h1>
              );
            })}
          </div>
          <input
            placeholder="enter a comment..."
            type="text"
            onKeyUp={e => this.handleSubmit(e, post.post_id)}
          />
        </div>
      );
    });
    return <Container>{posts}</Container>;
  }
}

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
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
