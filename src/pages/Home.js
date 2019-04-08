import React, { Component } from 'react';
import Bookmarks from '../components/Bookmarks';
import Likes from '../components/Likes';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import openSocket from 'socket.io-client'
import { customWrapper } from '../components/mixins';
import { Grommet, Tab, Tabs } from 'grommet';
import { post as URL } from '../services/baseURL';
import { connect } from 'react-redux';
// import axios form 'axios'


class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: [],
      search: ''
    }
    console.log(props.auth.id)
    this.username = props.auth.username;
    this.user_id = props.auth.id;
    this.socket = openSocket(URL);
  }

  componentDidMount () {
    this.socket.on('comments', (msg) => {
      console.log('here',msg)
      this.setState({ comments: [ {username: msg.username, content:msg.msg.content}, ...this.state.comments ] })
    })
  }

  handleChange = ({ target }) => {
    console.log(value)
    const { name, value } = target
    console.log(value)

    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    const body = event.target.value

    const comment = { action: 'create', content: body, user_id: this.user_id,
    post_id: 10, username: this.username }

    if (event.keyCode === 13 && body) {
      this.socket.emit('comments', comment)
      this.setState({ comments: [ {username: this.username, content:body}, ...this.state.comments ] })

      event.target.value = ''
    }
  }

  render() {
    console.log(this.state.comments)
    const comments = this.state.comments.map((message, index) => {
      console.log(message)
      return (
        <li key={index}>
         {message.username} <SPAN>{message.content}</SPAN>
        </li>
      )
    });
    return (
      <Container>
        <h1>hello computer people !</h1>
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
const SPAN = styled.span`
  font-weight:bold;
  font-size: 2rem;
`;

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps,{})(Home);
