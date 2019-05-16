import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'
import { StyledAddLink } from './StyledAddLink'
import ReusablePortal from './ModalPortal'
import { getPosts, updatePostsState } from '../../actions'
import { post as URL } from '../../services/baseURL'
import { ReactComponent as X } from '../../assets/svg/x.svg'
import { withAlert } from 'react-alert'

class AddLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      on: false,
      inputValue: '',
    }
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value })
  }

  toggle = () => {
    this.setState(
      {
        on: !this.state.on,
      },
      () => {
        if (this.state.on) {
          document.getElementById('form-key').focus()
        }
      }
    )
    document.querySelector('#root').classList.toggle('root-modal-open')
  }

  handleSubmit = e => {
    e.preventDefault()

    if (this.props.auth) {
      axios
        .post(`${URL}/api/posts`, {
          post_url: this.state.inputValue,
          id: this.props.auth.id,
        })
        .then(res => {
          this.props.updatePostsState(res.data)
          this.setState({
            inputValue: '',
            on: false,
          })
          document.querySelector('#root').classList.remove('root-modal-open')

          this.props.alert.success('Link added to Bookmarks')
        })
    }
  }
  render() {
    return (
      <div onKeyDown={e => e.which === 27 && this.toggle()}>
        <span onClick={() => this.toggle()}>
          {this.props.buttonName ? this.props.buttonName : 'Add Link'}
        </span>
        {/* <img src={addSvg} alt="" onClick={() => this.toggle()} /> */}
        {this.state.on && (
          <ReusablePortal>
            <MODALWRAPPER
              className='modal-wrapper'
              onClick={e =>
                e.target.className === 'modal-wrapper' && this.toggle()
              }
            >
              <div className='modal_'>
                <div className='top'>
                  <div className='modal_name'>Add a link</div>
                  <div className='modal_close' onClick={() => this.toggle()}>
                    <X />
                  </div>
                </div>
                <div className='modal_group'>
                  <form onSubmit={this.handleSubmit} className='add_link_form'>
                    <input
                      id='form-key'
                      value={this.state.inputValue}
                      onChange={this.handleChange}
                      placeholder='www.example.com/article.html'
                      type='input'
                      required
                    />
                    <button className='add-btn'>Add</button>
                  </form>
                </div>
              </div>
            </MODALWRAPPER>
          </ReusablePortal>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth: auth,
  }
}

const Alert = withAlert()(AddLink)

export default connect(
  mapStateToProps,
  { getPosts, updatePostsState }
)(Alert)

const MODALWRAPPER = styled.div`
  ${StyledAddLink}
`
