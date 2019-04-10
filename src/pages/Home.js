import React, { Component } from 'react';
import styled from 'styled-components';
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
  }

  componentDidMount() {
    axios
      .get(`${URL}/api/users/newsfeed`)
      .then(res => {
        console.log('axios res', res.data);
        this.setState({ posts: res.data.newResponse });
      })
      .catch(err => console.log(err));
  }

  handleChange = (e, post_id) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (event, post_id) => {
    const body = event.target.value;

    if (event.keyCode === 13 && body) {
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
    const posts = this.state.posts.map((post, index) => {
      return (
        <div styles={{
          border: '5px solid pink'
        }} className='lol' key={index}>
          <div>{post.username}</div>
          <img src={`${post.profile_picture}`} alt="user_profile_pic" />
          <img src={`${post.thumbnail_url}`} alt="post_thumbnail" />
          <div>{post.title}</div>
          <div>{post.description}</div>

          {/* <div>{post.}</div> */}
          <div>{post.comments.map((comment, index) => {
            console.log(comment)
            return (
            <h1 className='comments'>{comment.content}</h1>
          )})}
          </div>
          <input
          placeholder='enter a comment...'
          type='text'
          onKeyUp={(e) => this.handleSubmit(e, post.post_id)}/>
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
