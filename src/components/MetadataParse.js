import axios from 'axios';

import React, { Component } from 'react';

export default class MetadataParse extends Component {
  state = {
    image: '',
    description: '',
    title: ''
  };
  componentDidMount() {
    axios
      .get(`http://localhost:9000/?url=${this.props.children.props.href}`)
      .then(res => {
        this.setState({
          image: res.data.image,
          title: res.data.title,
          description: res.data.description
        });
      });
  }
  render() {
    let metaData = (
      <div class="post">
        <a href={this.props.children.props.href} target="_blank">
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
          <img src={this.state.image} alt="" />
        </a>
      </div>
    );
    return <div>{metaData}</div>;
  }
}
