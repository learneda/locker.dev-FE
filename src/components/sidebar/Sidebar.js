import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'
import { customLayout } from 'styles'
import locationSvg from 'assets/svg/location.svg'
import linkSvg from 'assets/svg/link-symbol.svg'
import calendarSvg from 'assets/svg/calendar.svg'

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
            <div
              className='user'
              style={{
                backgroundImage: `url(${this.props.user.header_picture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <img src={this.props.user.profile_picture} alt='avatar' />
            </div>
            <div className='user-bio'>
              <h3>{this.props.user.display_name}</h3>
              <h4>{`@${this.props.user.username}`}</h4>
              <div className='profile-stats'>
                <Link to='/locker'>
                  <ul>
                    <li className='count-label'>Posts</li>
                    <li className='count'>{this.props.collections.length}</li>
                  </ul>
                </Link>

                <Link to='/social/following'>
                  <ul>
                    <li className='count-label'>Following</li>
                    <li className='count'>{this.props.following.length}</li>
                  </ul>
                </Link>
                <Link to='/social/followers' className='sidebar-followers'>
                  <ul>
                    <li className='count-label'>Followers</li>
                    <li className='count'>{this.props.followers.length}</li>
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
  position: sticky;
  top: 66px;
  width: 100%;
`
const Profile = styled.div`
  position: sticky;
  top: 66px;
  width: 100%;
  background: #fff;
  border: 1px solid powderblue;

  .count {
    margin: 10px 0;
    font-size: 2rem;
    font-weight: bold;
    color: dodgerblue;
  }
  .count-label {
    font-weight: bold;
    font-size: 1.2rem;
    letter-spacing: 0.6px;
    color: #657786;
  }
  .user {
    position: relative;
    padding-left: 10px;
    height: 80px;
    background-color: dodgerblue;

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
    position: relative;
    flex-direction: column;
    flex-wrap: nowrap;
    padding: 5px 8% 10px;
    margin: 0 auto;
    overflow: hidden;
    h3 {
      font-size: 1.6rem;
      width: 100%;
      position: relative;
      padding-left: 95px;
      letter-spacing: 0.5px;
    }
    h4 {
      margin-bottom: 30px;
      font-size: 1.3rem;
      font-weight: 100px;
      margin-top: 5px;
      padding-left: 95px;
      color: #6d767e;
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
        background-color: dodgerblue;
        color: white;
        cursor: pointer;
        transition: 200ms ease-out;
        font-size: 1.4rem;
      }
    }
  }

  .profile-stats {
    display: flex;
    width: 100%;
    justify-content: space-between;

    a {
      margin-right: 12px;
      cursor: pointer;
    }
    ul {
      display: flex;
      flex-direction: column;
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

      li:nth-of-type(2) {
        opacity: 0.9;
        transition: 200ms ease-out;
      }
    }
    .sidebar-followers {
      margin-right: 0px;
    }
  }
`
