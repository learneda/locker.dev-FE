import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import axios from 'axios';
import styled from 'styled-components';
import { customWrapper } from '../mixins';
import { post as URL } from '../../services/baseURL';
import ContentLoader from 'react-content-loader';
import HelpScreen from '../utils/screens/HelpScreen';
import OnlineFriendsSVG from '../../assets/svg/online_friends.svg';
import PostContainer from './posts/index';
import { StyledFeed } from './StyledFeed';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ReactComponent as Loading } from '../../assets/svg/circles.svg';

const MyLoader = () => (
  <ContentLoader
    height={475}
    width={400}
    speed={2}
    primaryColor="#c2c2c2"
    secondaryColor="#ecebeb"
    style={{ minWidth: '100%', maxWidth: '700px', width: '100%' }}
  >
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
    <rect x="3" y="68" rx="5" ry="5" width="400" height="400" />
  </ContentLoader>
);

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      posts: [],
      loading: true,
      offset: 0,
      hasMore: true
    };
    this.username = props.auth.username;
    this.user_id = props.auth.id;
    this.socket = openSocket(URL);
  }

  componentDidMount() {
    this.socket.on('comments', msg => {
      console.log(msg);
      switch (msg.action) {
        case 'destroy':
          const new_state = this.state.posts.map((post, index) => {
            if (post.post_id === msg.post_id) {
              post.comments = post.comments.filter(
                comment => comment.id !== msg.id
              );
            }
            return post;
          });
          this.setState({ posts: new_state });
          break;
        case 'create':
          const updated_state = this.state.posts.map((post, index) => {
            if (post.post_id === msg.post_id) {
              post.comments.push(msg);
            }
            return post;
          });
          this.setState({ posts: updated_state });
          break;
        default:
          break;
      }
    });

    this.socket.on('like', data => {
      console.log('in like socket connection', data);
      switch (data.action) {
        case 'unlike':
          const updated_state = this.state.posts.map((post, index) => {
            if (post.post_id === data.post_id) {
              const likes = post.likes;
              post.likes = likes - 1;
            }
            return post;
          });
          this.setState({ posts: updated_state });
          break;
        default:
          const update_state = this.state.posts.map((post, index) => {
            if (post.post_id === data.post_id) {
              const likes = post.likes;
              post.likes = likes + 1;
            }
            return post;
          });
          this.setState({ posts: update_state });
          break;
      }
    });
    this.getNewsFeed();
  }

  // handles infinite scroll functionality
  handleOffset = async () => {
    this.setState(prevState => ({
      offset: prevState.offset + 5
    }));

    axios
      .get(`${URL}/api/users/newsfeed?offset=${this.state.offset}`)
      .then(res => {
        if (res.data.newResponse.length > 0) {
          this.setState({
            posts: this.state.posts.concat(res.data.newResponse)
          });
        } else {
          this.setState({ hasMore: false });
        }
      });
  };

  getNewsFeed = () => {
    const offset = this.state.offset;
    axios
      .get(`${URL}/api/users/newsfeed?offset=${offset}`)
      .then(res => {
        this.setState({ posts: res.data.newResponse, loading: false });
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

  handleDeleteComment = (comment_id, post_id) => {
    this.socket.emit('comments', {
      action: 'destroy',
      comment_id: comment_id,
      post_id: post_id
    });
  };

  handleClick = data => {
    this.socket.emit('like', data);
  };

  render() {
    const posts = this.state.posts.map((post, index) => (
      <PostContainer
        key={post.post_id}
        handleSubmit={this.handleSubmit}
        handleClick={this.handleClick}
        getNewsFeed={this.getNewsFeed}
        post={post}
        user_id={this.user_id}
        profile_picture={this.props.auth.profile_picture}
        handleDeleteComment={this.handleDeleteComment}
      />
    ));

    while (this.state.loading === true) {
      return (
        <Container style={{ minWidth: '100%' }}>
          <MyLoader />
        </Container>
      );
    }

    if (posts.length !== 0) {
      return (
        <Container>
          <InfiniteScroll
            dataLength={this.state.posts.length}
            next={this.handleOffset}
            hasMore={this.state.hasMore}
            loader={<Loading style={{ margin: 'auto', display: 'block' }} />}
          >
            {posts}
          </InfiniteScroll>
        </Container>
      );
    } else {
      return (
        <Container style={{ minWidth: '100%' }}>
          <HelpScreen
            headerText="Hello! Follow your friends and share your posts to them."
            imgSource={OnlineFriendsSVG}
          />
        </Container>
      );
    }
  }
}

const Container = styled.div`
  ${customWrapper('100%', '0 auto')}
  ${StyledFeed}
`;

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Feed);
