import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { StyledAddLink } from 'components/utils/StyledAddLink'
import ReusablePortal from 'components/utils/ModalPortal'
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
          {this.props.buttonName ? this.props.buttonName : '+'}
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

const mapStateToProps = ({ auth }) => ({ auth })

const Alert = withAlert()(AddLink)

export default connect(
  mapStateToProps,
  { createCollection }
)(Alert)

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;

  .modal_ {
    /* border: 2px solid blue; */
    background-color: white;
    z-index: 1;
    text-align: center;
    margin: 0 auto;
    margin-top: 10%;
    max-width: 500px;
    border-radius: 6px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding: 13px 18px 13px 25px;
    border-bottom: 1px solid #ddd;
    font-size: 1.6rem;
    margin-bottom: 14px;
    height: 64px;
    align-items: center;
  }

  .modal_name {
    font-weight: 500;
    font-size: larger;
  }

  .modal_group {
    position: relative;
  }
  .add_link_form {
    display: flex;
    justify-content: space-between;
    padding: 0 13px 13px 13px;
  }
  #form-key {
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 12px 8px;
    margin: 0;
    color: #000;
    width: 365px;
  }
  .add-btn {
    background-color: #3f65f2;
    padding: 5px 30px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: white;
    font-size: 1.6rem;
    font-weight: 700;
    transition: 200ms ease-out;
    cursor: pointer;
  }

  .add-btn:hover {
    background-color: #3059f3;
  }

  .modal_close:hover {
    cursor: pointer;
  }

  .root-modal-open {
    filter: blur(7px);
  }
`
