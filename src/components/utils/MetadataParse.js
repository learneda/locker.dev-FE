import axios from 'axios'
import React, { Component } from 'react'

export default class MetadataParse extends Component {
  state = {
    image: '',
    description: '',
    title: '',
  }

  componentDidMount() {
    axios.get(`${post}${this.props.children.props.href}`).then(res => {
      this.setState({
        image: res.data.image,
        title: res.data.title,
        description: res.data.description,
      })
    })
  }
  render() {
    let metaData = ''
    if (this.props.path === '/home') {
      metaData = (
        <React.Fragment>
          <img src={this.state.image} alt='' />
          <div>
            <h1>{this.state.title}</h1>
            <p>{this.state.description}</p>
          </div>
        </React.Fragment>
      )
    } else {
      metaData = (
        <a
          href={this.props.children.props.href}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h1>{this.state.title}</h1>
          <p>{this.state.description}</p>
          <img src={this.state.image} alt='' />
        </a>
      )
    }

    return <React.Fragment>{metaData}</React.Fragment>
  }
}
