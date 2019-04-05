import React, { Component } from 'react';
import Bookmarks from '../components/Bookmarks';
import Likes from '../components/Likes';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import openSocket from 'socket.io-client'
import { customWrapper } from '../components/mixins';
import { Grommet, Tab, Tabs } from 'grommet';
import { post as URL } from '../services/baseURL'

const socket = openSocket(URL)

export default class Home extends Component {
  constructor () {
    super()
    this.state = {
      comments: [],
      search: ''
    }
  }

  componentDidMount () {
    socket.on('comments', (msg) => {
      if (msg.action === 'create') {
        console.log(msg)
        this.setState({ comments: [ msg.content, ...this.state.comments ] })
      }
    })
  }

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    const body = event.target.value

    const comment = { action: 'create', content: body, user_id: 33,
    post_id: 10 }

    if (event.keyCode === 13 && body) {
      socket.emit('comments', comment)
      event.target.value = ''
    }
  }

  render() {
    const comments = this.state.comments.map((message, index) => {
      return (
        <li key={index}>
          <b>{}</b>
          {message}
        </li>
      )
    });
    return (
      <Container>
        <h1>hello hawmies!</h1>
        <input
          placeholder='enter a message...'
          type='text'
          onKeyUp={this.handleSubmit}
        />
        {comments}      
        </Container>
    );
  }
}

const Container = styled.div`
  ${customWrapper('80%', '0 auto')}
`;
