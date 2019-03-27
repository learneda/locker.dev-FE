import axios from 'axios';
import React, { Component } from 'react';
import styled from 'styled-components';
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
    let metaData = (
      <React.Fragment>
        <a href={this.props.children.props.href} target="_blank">
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
          <img src={this.state.image} alt="" />
        </a>
      </React.Fragment>
    );
    return <div>{metaData}</div>;
  }
}
