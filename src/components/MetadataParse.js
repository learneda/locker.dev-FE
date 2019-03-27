import axios from 'axios';
import React, { Component } from 'react';
import { post } from '../services/postURL';

export default class MetadataParse extends Component {
  state = {
    image: '',
    description: '',
    title: ''
  };

  componentDidMount() {
    axios.get(`${post}${this.props.children.props.href}`).then(res => {
      this.setState({
        image: res.data.image,
        title: res.data.title,
        description: res.data.description
      });
    });
  }
  render() {
    return (
      <a
        href={this.props.children.props.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <img src={this.state.image} alt="" />
      </a>
    );
  }
}
