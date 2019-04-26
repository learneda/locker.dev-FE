import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withAlert } from 'react-alert';
import styled from 'styled-components';
import { Grommet, TextInput, TextArea } from 'grommet';
import { post as URL } from '../services/baseURL';
import { editProfile } from '../actions';
import { customLayout, customWrapper } from '../components/mixins';
import axios from 'axios';

class Settings extends Component {
  state = {
    display_name: this.props.auth.display_name,
    username: this.props.auth.username,
    bio: this.props.auth.bio,
    location: this.props.auth.location,
    website_url: this.props.auth.website_url,
    selectedFile: null,
    profile_pic: null,
  };

  editProfileHandler = (e, id) => {
    e.preventDefault();
    const { display_name, username, bio, location, website_url } = this.state;
    this.props.editProfile(id, {
      display_name,
      username,
      bio,
      location,
      website_url,
    });
  };

  handleInputChange = e => this.setState({ [e.target.name]: e.target.value });

  handleFileSelection = e => {
    e.preventDefault();
    console.log(e.target.files[0]);
    this.setState({ selectedFile: e.target.files[0] });
  };

  handleFileUpload = e => {
    e.preventDefault();
    if (this.state.selectedFile) {
      const fd = new FormData();
      fd.append(
        'profile_pic',
        this.state.selectedFile,
        this.state.selectedFile.name
      );
      axios.post(`${URL}/api/images`, fd).then(res => {
        if (res.data.success) {
          axios.get(`${URL}/api/images`).then(res => {
            if (res.data.length > 0) {
              this.setState({ profile_pic: `${res.data[0].profile_picture}` });
            }
          });
        }
      });
    }
  };

  componentDidMount() {
    axios.get(`${URL}/api/images`).then(res => {
      if (res.data.length > 0) {
        this.setState({ profile_pic: `${res.data[0].profile_picture}` });
      }
    });
  }
  render() {
    return (
      <Wrapper>
        <h2>User Settings</h2>

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
                      value={this.state.display_name}
                      name='display_name'
                      required
                    />
                  </label>
                  <label>
                    Email Address
                    <TextInput
                      type='text'
                      onChange={this.handleInputChange}
                      placeholder='email address'
                      value={this.props.auth.email}
                      name='email'
                      required
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
                      value={this.state.website_url}
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
                      src={this.state.profile_pic}
                      alt='user_upload_picture'
                    />
                    <input
                      onChange={e => this.handleFileSelection(e)}
                      type='file'
                      name='profile_pic'
                    />
                    <button
                      onClick={e => this.handleFileUpload(e)}
                      type='submit'
                    >
                      Submit
                    </button>
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
                  );
                }}
              >
                Save
              </button>
            </div>
          </div>
        </FormGroup>
      </Wrapper>
    );
  }
}

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
};

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  @media (max-width: 768px) {
    ${customWrapper('90%', '0 auto')}
  }
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`;

const FormGroup = styled.form`
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  background: #fff;
  ${customWrapper('100%', '0 auto')}
  padding: 20px;
  @media (max-width: 768px) {
    padding: 0px;
  }

  .form-wrapper {
    padding: 10px;
    ${customLayout()}
    ${customWrapper('80%', '0 auto')}
    flex-direction: column;
    @media (max-width: 1100px) {
      ${customWrapper('100%', '0 auto')}
    }
    .row {
      padding: 10px;
      ${customLayout('space-between')}
      @media (max-width: 650px) {
        flex-direction: column;
      }
      .col-2 {
        width: 50%;
        padding: 10px;
        ${customLayout()}
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
        } // label
      } // col-2
    } // row

    .btn-group {
      ${customLayout('flex-end')}
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
`;

const mapStateToProps = ({ auth }) => ({ auth });

const Alert = withAlert()(Settings);

export default connect(
  mapStateToProps,
  { editProfile }
)(Alert);
