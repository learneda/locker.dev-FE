import React, { useState, useEffect } from 'react'
import axios from 'apis/axiosAPI'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import PostContainer from 'components/feed/posts'

const SinglePost = props => {
  const [post, setPost] = useState('')
  useEffect(() => {
    axios.get(`/posts/shared/${props.match.params.id}`).then(res => {
      setPost(res.data[0])
    })
  }, [])
  console.log(post, 'post')
  return (
    <Container>
      <div className='post-header'>
        <img className='profile_pic' src={post.profile_picture} />
        <div className='post-info'>
          <div>
            <span>{post.username}</span>
            <span>{post.created_at}</span>
          </div>
          <div>{post.user_thoughts}</div>
        </div>
      </div>
      <div className='post-image'>
        <img
          style={{ objectFit: 'cover', width: '100%' }}
          src={post.thumbnail_url}
        />
      </div>
      <div className='post-content'>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        <div>{post.root_url}</div>
        <div className='post-actionbar'>
          <span>Likes {post.likes}</span>
          <span>Add to Saved</span>
        </div>
      </div>
      <div className='post-comments'>
        {post.comments &&
          post.comments.map((comment, index) => {
            return (
              <div className='post-comment' key={index}>
                <div>
                  <div>
                    <span>{comment.username}</span>
                    <span>{comment.created_at}</span>
                  </div>
                  <div>{comment.content}</div>
                </div>
                <div>delete</div>
              </div>
            )
          })}
      </div>
    </Container>
  )
}

export default withRouter(SinglePost)

const Container = styled.div`
  border: 1px solid red;
  margin: 0 auto;
  max-width: 600px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  .post-header {
    outline: 1px solid blue;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid lightgray;
    .profile_pic {
      height: 50px;
      width: 50px;
      border-radius: 50%;
    }
    .post-info {
      outline: 1px solid red;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .post-image {
    outline: 1px solid orange;
  }
  .post-content {
    outline: 1px solid green;
    h2 {
    font-size: 2rem;
    font-weight: bold;
    }
  }
  .post-actionbar {
    outline: 1px solid purple;
  }
  .post-comments {
    outline 1px solid salmon;
  }
`
