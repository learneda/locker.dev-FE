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
    console.log(props.auth.id);
    this.username = props.auth.username;
    this.user_id = props.auth.id;
    this.socket = openSocket(URL);
  }

  componentDidMount() {
    this.socket.on('comments', msg => {
      console.log('here', msg);
      this.setState({
        comments: [
          { username: msg.username, content: msg.msg.content },
          ...this.state.comments
        ]
      });
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

  handleSubmit = event => {
    const body = event.target.value;

    const comment = {
      action: 'create',
      content: body,
      user_id: this.user_id,
      post_id: 10,
      username: this.username
    };

    if (event.keyCode === 13 && body) {
      this.socket.emit('comments', comment);
      this.setState({
        comments: [
          { username: this.username, content: body },
          ...this.state.comments
        ]
      });

      event.target.value = '';
    }
  };

  render() {
    // console.log(this.state.comments);
    // const comments = this.state.comments.map((message, index) => {
    //   console.log(message);
    //   return (
    //     <li key={index}>
    //       {message.username} <SPAN>{message.content}</SPAN>
    //     </li>
    //   );
    // });
    const posts = this.state.posts.map((post, index) => {
      return (
        <div key={index}>
          <div>{post.username}</div>
          <img src={`${post.profile_picture}`} alt="user_profile_pic" />
          <img src={`${post.thumbnail_url}`} alt="post_thumbnail" />
          <div>{post.title}</div>
          <div>{post.description}</div>
          {/* <div>{post.}</div> */}
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
