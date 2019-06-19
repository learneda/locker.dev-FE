import React, { useState, useEffect } from 'react'
import axios from 'apis/axiosAPI'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import Moment from 'react-moment'
import Feed from '../../components/feed'
import { createCollection } from '../../actions'
import { connect } from 'react-redux'

const SinglePost = props => {
  const [post, setPost] = useState([])
  useEffect(() => {
    console.log(props.match.params.id)
    axios.get(`/newsfeed/${props.match.params.id}`).then(res => {
      console.log('single post response', res.data)
      setPost([res.data.post])
    })
  }, [])
  return (
    <Feed
      posts={post}
      user={props.user}
      auth={props.auth}
      createCollection={props.createCollection}
    />
  )
}
const mapStateToProps = ({ user, auth }) => ({
  user: { ...auth, ...user },
  auth,
})

export default connect(
  mapStateToProps,
  { createCollection }
)(withRouter(SinglePost))

const Container = styled.div`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 0 1px 40px;
  border-radius: 8px;
  background: #fff;
  margin: 40px auto;
  max-width: 600px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  .post-header {
    display: flex;
    padding: 5px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
    .profile_pic {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      margin-right: 15px;
    }
    .post-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .post-author {
        display: flex;
        align-items: baseline;
        h2 {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 2px;
        }
        span {
          font-size: 1.4rem;
          opacity: 0.8;
          font-weight: normal;
          margin-left: 7px;
          &::before {
            content: '-';
            margin-right: 5px;
          }
        }
      }
      .post-thoughts {
        font-size: 2rem;
        font-weight: 400;
      }
    }
  }
  .post-image {
    max-height: 500px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .post-content {
    margin: 15px auto;
    h2 {
      font-size: 2rem;
      font-weight: bold;
      font-size: 2.6rem;
      opacity: 0.8;
    }
    p {
      margin-top: 10px;
      opacity: 0.8;
    }
    .root-url {
      display: inline-block;
      opacity: 0.8;
      margin: 5px auto;
      font-size: 1.7rem;
    }
    .post-actionbar {
      margin-top: 20px;
      span {
        margin-right: 40px;
      }
    }
  }

  .post-comments {
    .post-comment {
      background: #f3f4f7;
      margin-bottom: 20px;
      border-radius: 5px;
      padding: 10px;
      position: relative;
      .comment-author {
        span:nth-child(1) {
          font-weight: bold;
          margin-right: 5px;
          font-size: 1.4rem;
        }
        span:nth-child(2) {
          font-size: 1.2rem;
          opacity: 0.7;
          font-weight: bold;
          &::after {
            content: ':';
          }
        }
      }
      .comment-delete {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
  }
`
