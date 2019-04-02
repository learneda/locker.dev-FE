import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../actions';
import Toggle from '../components/Toggle';
import Moment from 'react-moment';
import 'moment-timezone';

class Home extends Component {
  componentDidMount = () => this.props.getPosts();

  render() {
    console.log('this is props sammy', this.props);
    const Post = styled.div`
      max-width: 1000px;
      width: 90%;
      margin: auto;
      display: flex;
      margin-bottom: 50px;
      // border: 1px solid #555;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      border-radius: 6px;
      background-color: #fff;
      position: relative;

      @media (max-width: 960px) {
        flex-direction: column;
        align-items: center;
      }
      .delete-icon {
        color: red;
        position: absolute;
        right: 20px;
        font-size: 4rem;
        cursor: pointer;
        opacity: 0.6;
        transition: 200ms ease-out;
        &:hover {
          opacity: 1;
          transition: 200ms ease-in;
        }
      }
      a {
        text-decoration: none;
        color: #444;
      }
      div {
        padding: 15px;
        margin: 0 5px;
      }

      img {
        width: 100%;
        border-radius: 6px;
        // margin-bottom: 60px;
        max-width: 320px;
        // min-height: 204px;
        max-height: 204px;
        height: 204px;
        object-fit: fill;
        height: 100%;
        // align-self: center;
        @media (max-width: 960px) {
          max-width: 600px;
          // margin-top: 15px;
          max-height: 400px;
          border-radius: 6px;
          border-radius: 0 0 6px 6px;
        }
      }
      p {
        max-width: 600px;
        margin: 10px auto;
        font-size: 1.6rem;
        text-align: justify;
        word-break: break-all;
        line-height: 1.5;
      }
      h1 {
        margin: 10px auto;
        font-size: 2.6rem;
        max-width: 600px;
      }
      .formatted-date {
        font-size: 1.2rem;
        opacity: 0.8;
        // align-self: flex-end;
        float: left;
        position: absolute;
      }
    `;

    return (
      <React.Fragment>
        <Toggle />
        {this.props.posts
          .map(
            post => (
              console.log(post),
              (
                <Post key={post.id}>
                  <span
                    className="delete-icon"
                    onClick={async () =>
                      await this.props
                        .deletePost(post.id)
                        .then(res => this.props.getPosts())
                    }
                  >
                    &times;
                  </span>
                  <a
                    href={post.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={post.thumbnail_url} alt="" />
                  </a>
                  <div>
                    <a
                      href={post.post_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h1>{post.title}</h1>
                    </a>
                    <p>{post.description}</p>
                    <span className="formatted-date">
                      Added <Moment fromNow>{post.created_at}</Moment>
                    </span>
                  </div>
                </Post>
              )
            )
          )
          .reverse()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    deletePost: state.deletePost
  };
};

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(Home);
