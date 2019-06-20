import React, { Component } from 'react'
import MoreBtn from '../../utils/MoreBtn'
import styled from 'styled-components'
import { customLayout } from '../../mixins'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import moment from 'moment'
class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentsToRender: -2,
      commentInput: '',
    }
  }

  handleMoreComments = e => {
    e.preventDefault()
    this.setState({
      commentsToRender: this.state.commentsToRender - 3,
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Container>
        <div className='comments-container'>
          <div className='comment-box'>
            {this.props.post_comments.length - 1 <
            Math.abs(this.state.commentsToRender) ? null : (
              <button
                className='show-more-btn'
                onClick={this.handleMoreComments}
              >
                show more comments
              </button>
            )}
            {this.props.post_comments
              .slice(this.state.commentsToRender)
              .map((comment, index) => {
                if (comment.user_id === this.props.user_id) {
                  return (
                    <div key={comment.id} className='comment'>
                      <div className='comment-text'>
                        <h2>
                          <Link to={`/profile/${comment.user_id}`}>
                            {comment.username}{' '}
                            <span className='comment-date'>
                              <Moment fromNow>
                                {moment(comment.created_at).subtract(
                                  '30',
                                  'seconds'
                                )}
                              </Moment>
                              :
                            </span>
                          </Link>
                        </h2>
                        <span>{comment.content}</span>
                      </div>
                      <MoreBtn
                        handleDeleteComment={this.props.handleDeleteComment}
                        comment_id={comment.id}
                        post_id={this.props.post_id}
                      />
                    </div>
                  )
                } else {
                  return (
                    <div key={comment.id} className='comment'>
                      <div className='comment-text'>
                        <h2>
                          <Link to={`/profile/${comment.user_id}`}>
                            {comment.username}{' '}
                            <span className='comment-date'>
                              <Moment fromNow>
                                {moment(comment.created_at).subtract(
                                  '30',
                                  'seconds'
                                )}
                              </Moment>
                              :
                            </span>
                          </Link>
                        </h2>
                        <span>{comment.content}</span>
                      </div>
                    </div>
                  )
                }
              })}
          </div>

          <div>
            <form
              onSubmit={e => {
                e.preventDefault()
                this.props.handleSubmit(
                  e,
                  this.props.post_id,
                  this.state.commentInput,
                  this.props.postOwnerId
                )
                this.setState({ commentInput: '' })
              }}
              className='add-comment'
            >
              <div className='pic-and-form'>
                <img src={this.props.profile_picture} alt='' />
                <input
                  placeholder='Add a comment...'
                  type='text'
                  name='commentInput'
                  value={this.state.commentInput}
                  onChange={this.handleChange}
                  ref={this.props.inputCommentRef}
                />
              </div>
              <button>Post!</button>
            </form>
          </div>
        </div>
      </Container>
    )
  }
}

export default CommentBox

const Container = styled.div`
  .comments-container {
    padding: 13px 15px;

    .add-comment {
      display: flex;
      align-items: center;

      @media (max-width: 600px) {
        flex-wrap: wrap;
      }
      .pic-and-form {
        display: flex;
        align-items: center;
        width: 100%;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 13px;
      }

      input {
        resize: none;
        padding: 10px;
        width: 100%;
        border-radius: 3px;
        border: 1px solid lightgrey;
        height: 40px;
        font-size: 1.4rem;
        ::placeholder {
          /* border-bottom: 1px solid lightgrey; */
        }
        :focus {
          border: 1px solid #3f65f2;
          outline: none;
        }
      }

      button {
        border: 1px solid transparent;
        background-color: #3f65f2;
        color: white;
        border-radius: 5px;
        font-weight: 700;
        margin-left: 20px;
        padding: 8px 25px;
        font-size: 1.5rem;
        cursor: pointer;
        @media (max-width: 600px) {
          width: 150px;
          margin-top: 10px;
          margin-left: auto;
        }
        @media (max-width: 400px) {
          width: 120px;
        }
      }
    }

    .more_btn {
      display: none;
    }

    .comment-box {
      .show-more-btn {
        border: 1px solid transparent;
        color: #4064f2;
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
        transition: 200ms ease-out;
        padding: 5px 10px;
        border-radius: 5px;
        margin-bottom: 10px;
        opacity: 0.9;
        background: #f1f2f5;
        &:hover {
          color: #3059f3;
          opacity: 1;
          transition: 200ms ease-in;
        }

        &:focus {
          outline: none;
        }
      }
    }

    .comment {
      ${customLayout('space-between')}
      margin-bottom: 15px;
      padding: 10px;
      background-color: #f3f4f7;
      border-radius: 5px;
      overflow: hidden;
      &:hover {
        .more_btn {
          display: flex;
          font-size: 2.5rem;
          font-weight: bold;
          cursor: pointer;
        }
      }

      .comment-text {
        h2 {
          margin-right: 10px;
          color: #222;
          font-weight: 700;
          font-size: 1.4rem;
        }
        .comment-date {
          opacity: 0.7;
          font-weight: 500;
          font-size: 1.2rem;
        }
        span {
          color: #222;
          opacity: 0.9;
          /* word-break: break-all; */
          overflow: hidden;
          width: 80%;
          font-size: 1.4rem;
          word-break: break-word;
        }
      }
    }
  }
`
