import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { customLayout, customWrapper } from 'styles'
import axios from 'apis/axiosAPI'
import store from 'App/store'
import * as types from 'App/store/appTypes'

const ProfileSettings = props => {
  const { auth, user, editUser } = props
  const alert = useAlert()
  const [profile, setProfile] = useState(user)
  const [photo, setPhoto] = useState({
    avatar: '',
    avatarSrc: user.profile_picture,
    header: '',
    headerSrc: user.header_picture,
  })
  const {
    display_name,
    email,
    username,
    bio,
    location,
    website_url,
    profile_picture,
    header_picture,
  } = profile

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleFileUpload = async () => {
    const { avatar, header } = photo
    //TODO: clean up this logic
    if (avatar) {
      const fd = new FormData()
      fd.append('profile_pic', avatar)
      const res = await axios.post(`/images`, fd)
      if (res.data.success) {
        // update redux store here
        store.dispatch({
          type: types.UPDATE_PROFILE_PICTURE,
          payload: res.data.user.profile_picture,
        })
      }
    }
    if (header) {
      const fd = new FormData()
      fd.append('profile_pic', header)
      const res = axios.post(`/images/header`, fd)
      if (res.data.success) {
        if (res.data.user.header_picture) {
          // update redux store here
          store.dispatch({
            type: types.UPDATE_HEADER_PICTURE,
            payload: res.data.user.header_picture,
          })
        }
      }
    }
  }

  // launches onSubmitting of page form
  const editProfileHandler = async e => {
    e.preventDefault()
    const { avatar, header } = photo
    await editUser(auth.id, profile)
    // calls func to handle profile change if a new file has been selected
    // selectedFile default value is falsey until user selects file
    if (avatar || header) {
      handleFileUpload()
    }
  }

  // invokes when user selects picture NOT thru dropzone
  const handleFileSelection = e => {
    e.preventDefault()
    const file = e.target.files[0]
    const { name } = e.target
    if (file) {
      if (name === 'profile_pic') {
        // set state on selected file
        setPhoto({ ...photo, avatar: file })
        // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
        const reader = new FileReader()
        reader.onload = e => {
          setPhoto({ ...photo, avatarSrc: e.target.result })
        }
        reader.readAsDataURL(file)
      } else {
        setPhoto({ ...photo, header: file })
        const reader = new FileReader()
        reader.onload = e => {
          setPhoto({ ...photo, headerSrc: e.target.result })
        }
        reader.readAsDataURL(file)
      }
    } else {
      //! window.alert is the mark of a desperate coder
      window.alert('Only JPEG, PNG, or GIF file types allowed')
    }
  }

  // invokes when user drops a file on dropzone
  const handleDropZone = (file, type) => {
    // set state on selected file
    if (type === 'profile') {
      setPhoto({ ...photo, avatar: file })
      const reader = new FileReader()

      reader.onload = e => {
        setPhoto({ ...photo, avatarSrc: e.target.result })
      }

      reader.readAsDataURL(file)
    } else {
      setPhoto({ ...photo, header: file })
      const reader = new FileReader()
      reader.onload = e => {
        setPhoto({ ...photo, headerSrc: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragEvent = e => {
    e.stopPropagation()
    e.preventDefault()
  }

  const handleDrop = (e, type) => {
    // read more on
    // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Showing_thumbnails_of_user-selected_images
    e.stopPropagation()
    e.preventDefault()

    const dt = e.dataTransfer
    const files = dt.files

    handleDropZone(files[0], type)
  }

  return (
    <Wrapper>
      <FormGroup onSubmit={editProfileHandler}>
        <div className='form-wrapper'>
          <div className='row'>
            <div className='col-2'>
              <label>
                Name
                <input
                  type='text'
                  onChange={handleChange}
                  placeholder='Add a name'
                  value={display_name}
                  name='display_name'
                  required
                />
              </label>
              <label>
                Email Address
                <input
                  type='text'
                  onChange={handleChange}
                  placeholder='email address'
                  value={email}
                  name='email'
                />
              </label>
              <label>
                Username
                <input
                  type='text'
                  onChange={handleChange}
                  placeholder='Add username'
                  value={username}
                  name='username'
                  required
                />
              </label>

              <label>
                Bio
                <textarea
                  type='text'
                  onChange={handleChange}
                  placeholder='Add bio'
                  value={bio}
                  name='bio'
                />
              </label>
            </div>

            <div className='col-2'>
              <label>
                Location
                <input
                  type='text'
                  onChange={handleChange}
                  placeholder='Add location'
                  value={location || ''}
                  name='location'
                />
              </label>

              <label>
                Website URL
                <input
                  type='text'
                  onChange={handleChange}
                  placeholder='Add website URL'
                  value={website_url || ''}
                  name='website_url'
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
                  src={photo.avatarSrc}
                  onDragEnter={handleDragEvent}
                  onDragOver={handleDragEvent}
                  onDrop={e => handleDrop(e, 'profile')}
                  alt='user_upload_picture'
                />
                <input
                  onChange={handleFileSelection}
                  type='file'
                  name='profile_pic'
                  accept='.png,.jpg,.gif'
                />
              </label>
              {/* ========== */}
              <label>
                Header Picture
                <img
                  style={{
                    width: '200px',
                    display: 'block',
                    margin: '10px auto',
                  }}
                  src={photo.headerSrc}
                  onDragEnter={handleDragEvent}
                  onDragOver={handleDragEvent}
                  onDrop={e => handleDrop(e, 'header')}
                  alt='user_upload_picture'
                />
                <input
                  onChange={handleFileSelection}
                  type='file'
                  name='header_pic'
                  accept='.png,.jpg,.gif'
                />
              </label>
            </div>
          </div>

          <div className='btn-group'>
            <Link to='/'>Cancel</Link>
            <button
              type='submit'
              onClick={() => {
                alert.success('User settings successfully updated.')
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

export default ProfileSettings

ProfileSettings.propTypes = {
  auth: PropTypes.any,
  user: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    bio: PropTypes.string,
    location: PropTypes.any,
    website_url: PropTypes.any,
    email: PropTypes.string,
    profile_picture: PropTypes.string,
    header_picture: PropTypes.string,
  }).isRequired,
}
const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')};
  @media (max-width: 768px) {
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
  ${customWrapper('100%', '0 auto')};
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }
  .form-wrapper {
    padding: 10px;
    ${customLayout()};
    ${customWrapper('80%', '0 auto')};
    flex-direction: column;
    @media (max-width: 1100px) {
      ${customWrapper('100%', '0 auto')};
    }
    .row {
      padding: 10px;
      ${customLayout('space-between')};
      @media (max-width: 650px) {
        flex-direction: column;
      }
      .col-2 {
        width: 50%;
        padding: 10px;
        ${customLayout()};
        flex-wrap: wrap;
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
        }
      }
    }
    .btn-group {
      ${customLayout('flex-end')};
      width: 100%;
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
