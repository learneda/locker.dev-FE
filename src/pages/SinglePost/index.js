import React, { Component } from 'react'
import axios from 'apis/axiosAPI'
import { withRouter } from 'react-router-dom'

class SinglePost extends Component {
  componentDidMount() {
    // console.log(this.props);
    axios.get(`/posts/shared/${this.props.match.params.id}`).then(res => {
      console.log(res.data)
    })
  }

  render() {
    return <div>{/* <PostContainer /> */}</div>
  }
}
export default withRouter(SinglePost)
