import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import { customLayout } from '../mixins'
import locationSvg from 'assets/svg/location.svg'
import linkSvg from 'assets/svg/link-symbol.svg'
import calendarSvg from 'assets/svg/calendar.svg'
import { StyledSidebar } from './StyledSidebar'

const MyLoader = () => (
  <ContentLoader
    height={451}
    width={266}
    speed={2}
    primaryColor='#f3f3f3'
    secondaryColor='#ecebeb'
  >
    <circle cx='133' cy='84' r='50' />
    <rect x='0' y='134' rx='0' ry='0' width='266' height='317' />
  </ContentLoader>
)
class Sidebar extends Component {
  render() {
    if (!this.props.user) {
      return (
        <Wrapper>
          <MyLoader />
        </Wrapper>
      )
    }
    return (
      <Wrapper>
        {this.props.user && (
          <Profile>
            <div className='user'>
              <img src={this.props.user.profile_picture} alt='avatar' />
            </div>
            <div className='user-bio'>
              <h3>{this.props.user.displayName}</h3>
              <div className='profile-stats'>
                <Link to='/saved'>
                  <ul>
                    <li>Saved</li>
                    <li>{this.props.collections.length}</li>
                  </ul>
                </Link>

                <Link to='/social/following'>
                  <ul>
                    <li>Following</li>
                    <li>{this.props.following.length}</li>
                  </ul>
                </Link>
                <Link to='/social/followers' className='sidebar-followers'>
                  <ul>
                    <li>Followers</li>
                    <li>{this.props.followers.length}</li>
                  </ul>
                </Link>
              </div>
            </div>
          </Profile>
        )}
      </Wrapper>
    )
  }
}

export default Sidebar

const Wrapper = styled.div`
  position: relative;
  width: 290px;

  @media (max-width: 910px) {
    display: none;
  }
`
const Profile = styled.div`
  position: sticky;
  top: 60px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  background: #fff;

  .user {
    position: relative;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding-left: 20px;
    height: 80px;
    margin-bottom: 50px;
    background-color: #4064f2;

    img {
      position: absolute;
      top: 30px;
      border: 3px solid #fff;
      border-radius: 50%;
      height: 100px;
      width: 100px;
      object-fit: cover;
    }
  }

  .user-bio {
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 15px 8%;
    margin: 0 auto;
    @media (max-width: 1350px) {
      width: 100%;
    }
    h3 {
      margin: 0 auto;
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    p {
      line-height: 25px;
      margin-bottom: 15px;
      img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        margin-bottom: -3px;
      }
    }

    mark {
      background-color: transparent;
      color: #333;
    }

    .follow-btn-grp {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 20px;
      button {
        padding: 5px 10px;
        font-weight: 700;
        border: transparent;
        border-radius: 5px;
        background-color: #3f65f2;
        color: white;
        cursor: pointer;
        transition: 200ms ease-out;
        font-size: 1.4rem;
      }
    }

    .edit-profile-link {
      margin-bottom: 3.5px;
      a {
        font-size: 1.4rem;
        font-weight: 700;
        color: #6d767e;
        transition: 200ms ease-out;

        &:hover {
          color: #3f65f2;
          transition: 200ms ease-in;
        }
      }
    }
  }

  .profile-stats {
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 1400px) {
      /* flex-direction: column; */
      flex-wrap: wrap;
    }
    a {
      margin-right: 12px;
      cursor: pointer;
    }
    ul {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      cursor: pointer;
      transition: 200ms ease-out;
      :not(:last-child) {
        margin-right: 12px;
      }

      &:hover {
        color: #3f65f2;
        transition: 200ms ease-in;
        li:nth-of-type(2) {
          opacity: 1;
        }
      }
      li {
        font-size: 1.6rem;
      }
      li:nth-of-type(2) {
        opacity: 0.7;
        // text-align:center
        transition: 200ms ease-out;
      }
    }
    .sidebar-followers {
      margin-right: 0px;
    }
  }
`
