import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withAlert } from 'react-alert'
import styled from 'styled-components'
import { Grommet, TextInput, TextArea } from 'grommet'
import { editUser } from 'actions'
import { apiURL } from 'services'
import { customLayout, customWrapper } from 'components/mixins'
import axios from 'apis/axiosAPI'
class ProfileSettings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: this.props.user.displayName,
      username: this.props.user.username || '',
      bio: this.props.user.bio || '',
      location: this.props.user.location || '',
      websiteUrl: this.props.user.websiteUrl || '',
      email: this.props.user.email || '',
      selectedFile: '',
      profile_pic: '',
    }
    this.image = React.createRef()
  }

  editProfileHandler = (e, id) => {
    e.preventDefault()
    const {
      displayName,
      username,
      bio,
      location,
      websiteUrl,
      email,
    } = this.state
    this.props.editUser(id, {
      displayName,
      username,
      bio,
      location,
      websiteUrl,
      email,
    })
    this.handleFileUpload()
  }

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

  handleFileSelection = e => {
    e.preventDefault()
    if (e.target.files[0]) {
      const file = e.target.files[0].type

      if (
        file === 'image/jpeg' ||
        file === 'image/png' ||
        file === 'image/gif'
      ) {
        this.setState({ selectedFile: e.target.files[0] })
        const reader = new FileReader()

        reader.onload = (function(aImg) {
          return function(e) {
            aImg.src = e.target.result
          }
        })(this.image.current)

        reader.readAsDataURL(e.target.files[0])

        // console.log(this.image.current.src)
      } else {
        alert('Only JPEG, PNG, or GIF file types allowed')
      }
    }
  }

  handleDropZone = file => {
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif'
    ) {
      this.setState({ selectedFile: file })
      const reader = new FileReader()

      reader.onload = (function(aImg) {
        return function(e) {
          aImg.src = e.target.result
        }
      })(this.image.current)

      reader.readAsDataURL(file)
    } else {
      alert('Only JPEG, PNG, or GIF file types allowed')
    }
  }

  handleFileUpload = e => {
    // e.preventDefault()
    console.log('in the fired func !', this.state.selectedFile)
    if (this.state.selectedFile) {
      const fd = new FormData()
      fd.append(
        'profile_pic',
        this.state.selectedFile,
        this.state.selectedFile.name
      )
      axios.post(`/images`, fd).then(res => {
        if (res.data.success) {
          axios.get(`/images`).then(res => {
            if (res.data.length > 0) {
              this.setState({ profile_pic: `${res.data[0].profile_picture}` })
              this.props.editUser(this.props.auth.id, {
                profile_picture: res.data[0].profile_picture,
              })
            }
          })
        }
      })
    }
  }

  componentDidMount() {
    axios.get(`/images`).then(res => {
      if (res.data.length > 0) {
        this.setState({ profile_pic: `${res.data[0].profile_picture}` })
      }
    })
  }
  dragEnter = e => {
    e.stopPropagation()
    e.preventDefault()
  }
  dragOver = e => {
    e.stopPropagation()
    e.preventDefault()
  }
  drop = e => {
    e.stopPropagation()
    e.preventDefault()

    const dt = e.dataTransfer
    const files = dt.files

    console.log(files[0])
    this.handleDropZone(files[0])
  }
  render() {
    return (
      <Wrapper>
        <FormGroup
          onSubmit={e => this.editProfileHandler(e, this.props.auth.id)}
        >
          <div className='form-wrapper'>
            <Grommet theme={theme}>
              <div className='row'>
                <div className='col-2'>
                  <label>
                    Name
                    <TextInput
                      type='text'
                      onChange={this.handleInputChange}
                      placeholder='Add full name'
                      value={this.state.displayName}
                      name='displayName'
                      required
                    />
                  </label>
                  <label>
                    Email Address
                    <TextInput
                      type='text'
                      onChange={this.handleInputChange}
                      placeholder='email address'
                      value={this.state.email}
                      name='email'
                    />
                  </label>
                  <label>
                    Username
                    <TextInput
                      type='text'
                      onChange={this.handleInputChange}
                      placeholder='Add username'
                      value={this.state.username}
                      name='username'
                      required
                    />
                  </label>

                  <label>
                    Bio
                    <TextArea
                      type='text'
                      onChange={this.handleInputChange}
                      placeholder='Add bio'
                      value={this.state.bio}
                      name='bio'
                    />
                  </label>
                </div>

                <div className='col-2'>
                  <label>
                    Location
                    <TextInput
                      type='text'
                      onChange={this.handleInputChange}
                      placeholder='Add location'
                      value={this.state.location}
                      name='location'
                    />
                  </label>

                  <label>
                    Website URL
                    <TextInput
                      type='text'
                      onChange={this.handleInputChange}
                      placeholder='Add website URL'
                      value={this.state.websiteUrl}
                      name='websiteUrl'
                    />
                  </label>
                  <label>
                    Profile Picture
                    <img
                      style={{
                        width: '200px',
                        display: 'block',
                        margin: '10px auto',
                      }}
                      ref={this.image}
                      src={this.state.profile_pic}
                      onDragEnter={this.dragEnter}
                      onDragOver={this.dragOver}
                      onDrop={this.drop}
                      alt='user_upload_picture'
                    />
                    {/* <Dropzone
                      backgroundPicture={this.state.profile_pic}
                      handleDropZone={this.handleDropZone}
                    /> */}
                    <input
                      onChange={e => this.handleFileSelection(e)}
                      type='file'
                      name='profile_pic'
                    />
                    {/* <button
                      onClick={e => this.handleFileUpload(e)}
                      type='submit'
                    >
                      Submit
                    </button> */}
                  </label>
                </div>
              </div>
            </Grommet>

            <div className='btn-group'>
              <Link to='/home'>Cancel</Link>
              <button
                type='submit'
                onClick={() => {
                  this.props.alert.success(
                    'User settings successfully updated.'
                  )
                }}
              >
                Save
              </button>
            </div>
          </div>
        </FormGroup>
      </Wrapper>
    )
  }
}

const ProfileSettingsWithAlert = withAlert()(ProfileSettings)

const mapStateToProps = ({ auth, user }) => ({ auth, user })
export default connect(
  mapStateToProps,
  { editUser }
)(ProfileSettingsWithAlert)

const theme = {
  global: {
    focus: {
      border: {
        color: '#3f65f2',
      },
    },
  },
  text: {
    xsmall: {
      size: '12px',
      height: '18px',
      maxWidth: '288px',
    },
  },
}

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')} @media (max-width: 768px) {
    ${customWrapper('90%', '0 auto')};
  }
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`

const FormGroup = styled.form`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  background: #fff;
  ${customWrapper('100%', '0 auto')} padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
  .form-wrapper {
    padding: 10px;
    ${customLayout()} ${customWrapper('80%', '0 auto')} flex-direction: column;
    @media (max-width: 1100px) {
      ${customWrapper('100%', '0 auto')};
    }
    .row {
      padding: 10px;
      ${customLayout('space-between')} @media (max-width: 650px) {
        flex-direction: column;
      }
      .col-2 {
        width: 50%;
        padding: 10px;
        ${customLayout()} flex-wrap: wrap;
        @media (max-width: 650px) {
          width: 100%;
        }
        label {
          width: 100%;
          padding: 20px 0;
          color: gray;
          input,
          textarea {
            width: 100%;
            border: 1px solid rgba(0, 0, 0, 0.33);
            margin-top: 10px;
            border-radius: 5px;
            padding: 10px;
            color: #333;
            resize: none;
            &:focus {
              outline: none;
              border: 1px solid #3e66f2;
            }
          }
          textarea {
            height: 100px;
          }
        } // label
      } // col-2
    } // row
    .btn-group {
      ${customLayout('flex-end')} width: 100%;
      padding: 20px;
      button {
        width: 15%;
        min-width: 100px;
        margin-left: 30px;
        border: 1px solid transparent;
        border-radius: 5px;
        padding: 10px 0;
        background-color: #3e66f2;
        color: white;
        font-weight: 700;
        font-size: 1.6rem;
        transition: 200ms ease-in;
        cursor: pointer;
        &:hover {
          background-color: #3059f3;
        }
      }
      a {
        padding-top: 13px;
        transition: 150ms ease-in;
        font-weight: 700;
        &:hover {
          color: #3e66f2;
        }
      }
    }
  }
`
