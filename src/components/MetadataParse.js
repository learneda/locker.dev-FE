import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';

export default class MetadataParse extends Component {
  state = {
    image: '',
    description: '',
    title: ''
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8000/api/post/?url=${this.props.children.props.href}`
      )
      .then(res => {
        this.setState({
          image: res.data.image,
          title: res.data.title,
          description: res.data.description
        });
      });
  }
  render() {
    const Post = styled.div`
      max-width: 700px;
      margin: auto;
      text-align: center;

      a {
        text-decoration: none;
        color: #444;
      }

      img {
        width: 100%;
        border-radius: 10px;
        margin-bottom: 60px;
      }
      p {
        max-width: 600px;
        margin: 10px auto;
        font-size: 1.8rem;
      }
      h1 {
        margin: 10px auto;
        font-size: 3rem;
      }
    `;

    let metaData = (
      <Post>
        <a href={this.props.children.props.href} target="_blank">
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
          <img src={this.state.image} alt="" />
        </a>
      </Post>
    );
    return <div>{metaData}</div>;
  }
}
