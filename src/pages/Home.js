import React, { Component } from 'react';
import MetadataParse from '../components/MetadataParse';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getPosts } from '../actions';
import Toggle from '../components/Toggle'

class Home extends Component {
  componentDidMount = () => this.props.getPosts();

  render() {
    console.log('this is props sammy', this.props);
    const Post = styled.div`
      max-width: 1000px;
      margin: auto;
      text-align: center;
      display: flex;
      margin-bottom: 40px;
      border: 1px solid lightgrey;
      border-radius: 6px;
      a {
        text-decoration: none;
        color: #444;
      }
      div {
        padding: 15px;
        margin: 0 auto;
      }

      img {
        width: 100%;
        border-radius: 6px;
        // margin-bottom: 60px;
        max-width: 320px;
        max-height: 180px;
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
        {/*<Post>
          <MetadataParse path={this.props.location.pathname}>
            <a href="https://riley.gg">test</a>
          </MetadataParse>
        </Post>

        <Post>
          <MetadataParse path={this.props.location.pathname}>
            <a href="https://www.youtube.com/watch?v=HSwjGP19rTg">test</a>
          </MetadataParse>
        </Post>
        <Post>
          <MetadataParse path={this.props.location.pathname}>
            <a href="https://www.youtube.com/watch?v=-W_VsLXmjJU">test</a>
          </MetadataParse>
        </Post>
        <Post>
          <MetadataParse path={this.props.location.pathname}>
            <a href="https://www.youtube.com/watch?v=93p3LxR9xfM">test</a>
          </MetadataParse>
        </Post>*/}
        {this.props.posts.map(post => (
          <Post>
            <MetadataParse path={this.props.location.pathname}>
              <a href={post.post_url}>{post.metadata.title}</a>
            </MetadataParse>
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
