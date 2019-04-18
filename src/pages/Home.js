import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import openSocket from 'socket.io-client';
import axios from 'axios';
import styled from 'styled-components';
import { customWrapper } from '../components/mixins';
import { post as URL } from '../services/baseURL';
import { ReactComponent as Loading } from '../assets/svg/circles.svg';
import ContentLoader, { Facebook } from 'react-content-loader';
import CommentBox from '../components/comments/CommentBox';
import HelpScreen from '../components/utils/HelpScreen';
import onlineFriendsSVG from '../assets/svg/online_friends.svg';

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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      search: '',
      posts: [],
      loading: true
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
          <CommentBox
            getNewsFeed={this.getNewsFeed}
            post={post}
            handleSubmit={this.handleSubmit}
            profile_picture={this.props.auth.profile_picture}
            user_id={this.user_id}
          />
        </div>
      );
    });

    while (this.state.loading === true) {
      return (
        <Container style={{ minWidth: '100%' }}>
          <MyLoader />
        </Container>
      );
    }

    if (posts.length !== 0) {
      return <Container>{posts}</Container>;
    } else {
      return (
        <Container style={{ minWidth: '100%' }}>
          <HelpScreen headerText="Hello! Follow your friends and share your posts to them." imgSource={onlineFriendsSVG} />
        </Container>
      );
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
`;

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(
  mapStateToProps,
  {}
)(Home);
