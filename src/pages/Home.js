import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import Toggle from '../components/Toggle';

class Home extends Component {
  componentDidMount = () => this.props.getPosts();

  render() {
    console.log('this is props sammy', this.props);
    const Post = styled.div`
      max-width: 1000px;
      margin: auto;
      display: flex;
      margin-bottom: 50px;
      // border: 1px solid #555;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      border-radius: 6px;
      background-color: #fff;
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
        min-height: 201px;
        height: 100%;
        // align-self: center;
      }
      p {
        max-width: 600px;
        margin: 10px auto;
        font-size: 1.8rem;
        text-align: justify;
        word-break: break-all;
        line-height: 1.5;
      }
      h1 {
        margin: 10px auto;
        font-size: 3rem;
        max-width: 600px;
      }
    `;

    return (
      <React.Fragment>
        <Toggle />
        {this.props.posts.map(post => (
          <Post key={post.id}>
            <a href={post.post_url} target="_blank">
              <img src={post.thumbnail_url} alt="" />
            </a>
            <div>
              <a href={post.post_url} target="_blank">
                <h1>{post.title}</h1>
              </a>
              <p>{post.description}</p>
            </div>
          </Post>
        ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  { getPosts }
)(Home);
