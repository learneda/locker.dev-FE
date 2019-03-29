import React, { Component } from 'react';
import MetadataParse from '../components/MetadataParse';
import styled from 'styled-components';
import axios from 'axios';
import AddLinkPortal from '../components/AddLinkPortal'
import Toggles from '../components/Toggle';
axios.defaults.withCredentials = true;

export default class Home extends Component {
  constructor (props) {
    super(props)
   this.state = {
      users: [],
      savedArticles: []
    }; 
  }
  componentDidMount(){
    axios.get('http://localhost:8000/api/posts').then((res) => {
      res.data.map((post) => this.state.savedArticles.push(post))
    })
  }
  render() {
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
      }
      h1 {
        margin: 10px auto;
        font-size: 3rem;
        max-width: 600px;
      }
    `;
    if (this.state.savedArticles.length <= 0) {
      return (
        <Toggles />
      )
    } else {
    return (
      // <React.Fragment>
        <div>
          {/* <AddLinkPortal>
            Add Link
          </AddLinkPortal> */}
        <Post>
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
        </Post>
        </div>
      // </React.Fragment>
      );
    }
  }
}
