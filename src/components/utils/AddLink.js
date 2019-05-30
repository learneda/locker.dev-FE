import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { StyledAddLink } from './StyledAddLink'
import ReusablePortal from './ModalPortal'
import { createCollection } from '../../actions'
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
      this.setState({ on: !this.state.on, inputValue: '' })

      this.props
        .createCollection({
          post_url: this.state.inputValue,
          type: 'link',
        })
        .then(res => {
          // console.log('response from createCollection ==>', res)
          if (res.msg === 'success') {
            this.props.alert.success('Link added to Saved')
          } else if (res.msg === 'whoops!') {
            this.props.alert.error('whoops, unable to add')
          }
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
            <ModalWrapper
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
            </ModalWrapper>
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
  { createCollection }
)(Alert)

const ModalWrapper = styled.div`
  ${StyledAddLink}
`
