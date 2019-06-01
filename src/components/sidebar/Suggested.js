import React from 'react'
import { Link } from 'react-router-dom'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const MyLoader = () => (
  <ContentLoader
    height={150}
    width={180}
    speed={2}
    primaryColor='#f3f3f3'
    secondaryColor='#ecebeb'
  >
    <circle cx='90' cy='35' r='25' />
    <rect x='45' y='70' rx='0' ry='0' width='90' height='15' />
    <rect x='60' y='91' rx='0' ry='0' width='60' height='22' />
    <rect x='10' y='120' rx='0' ry='0' width='1160' height='14' />
  </ContentLoader>
)

const Suggested = props => {
  const {
    auth,
    suggested,
    fetchUser,
    fetchFollowing,
    fetchSuggested,
    followAUser,
  } = props

  const followAUserHandler = async (e, friend_id) => {
    e.preventDefault()
    await followAUser({ user_id: auth.id, friend_id })
    fetchUser(auth.id)
    fetchFollowing(auth.id)
    await fetchSuggested(auth.id)
  }

  const renderRecommended = () => {
    if (!suggested.length) {
      return (
        <>
          <div className='recommended-follow-container'>
            <MyLoader />
          </div>
          <div className='recommended-follow-container'>
            <MyLoader />
          </div>
          <div className='recommended-follow-container'>
            <MyLoader />
          </div>
        </>
      )
    } else {
      return suggested.map((ele, index) => (
        <div className='recommended-follow-container' key={index}>
          <div className='recommended-follow-info'>
            <Link to={`/profile/${ele.recommended_follow_id}`}>
              <img src={ele.image} alt='suggested' />
              <h2>{ele.username}</h2>
            </Link>
          </div>
          <div className='follow-button'>
            <button
              type='button'
              onClick={e => followAUserHandler(e, ele.recommended_follow_id)}
            >
              Follow
            </button>
            {ele.followed_by_username && (
              <Link to={`/profile/${ele.followed_by_id}`}>
                <p>Followed by {ele.followed_by_username}</p>
              </Link>
            )}
          </div>
        </div>
      ))
    }
  }

  return (
    <StyledCard>
      <div className='sticky-container'>{renderRecommended()}</div>
    </StyledCard>
  )
}

export default Suggested

const StyledCard = styled.div`
  margin: 0px 0px 0px 30px;
  height: auto;
  @media (max-width: 1200px) {
    display: none;
  }
  .sticky-container {
    position: sticky;
    top: 160px;
    margin-top: 27px;
  }
  .recommended-follow-container {
    margin-bottom: 20px;
    background: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    padding: 10px;
    border-radius: 6px;
    min-width: 180px;
    .recommended-follow-info {
      display: flex;
      align-items: center;
      justify-content: center;
      h2 {
        /* margin-left: 10px; */
        margin: 8px auto;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: block;
        margin: auto;
      }
    }
    .follow-button {
      text-align: center;
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
      p {
        font-size: 1.2rem;
        opacity: 0.8;
        text-align: center;
        margin: 10px auto;
      }
    }
  }
`
