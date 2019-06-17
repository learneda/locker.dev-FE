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
  const { auth, suggested, fetchFollowing, fetchSuggested, followAUser } = props

  const followAUserHandler = async (e, friend_id) => {
    e.preventDefault()
    await followAUser({ user_id: auth.id, friend_id })
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
            <div className='suggested-wrap'>
              <Link
                className='left-suggested'
                to={`/profile/${ele.recommended_follow_id}`}
              >
                <img src={ele.image} alt='suggested' />
              </Link>
              <div className='right-suggested'>
                <Link to={`/profile/${ele.recommended_follow_id}`}>
                  <h2>{ele.username}</h2>
                </Link>
                <div className='follow-button'>
                  <button
                    type='button'
                    onClick={e =>
                      followAUserHandler(e, ele.recommended_follow_id)
                    }
                  >
                    Follow
                  </button>
                </div>
              </div>
            </div>
            {ele.followed_by_username && (
              <Link
                className='followed-by'
                to={`/profile/${ele.followed_by_id}`}
              >
                <p className='followed-by-p'>
                  Followed by {ele.followed_by_username}
                </p>
              </Link>
            )}
          </div>
        </div>
      ))
    }
  }

  return (
    <StyledCard>
      <div className='sticky-container-too recommended-follow-container'>
        <h2 className='suggested-heading'>Suggested Friends</h2>
      </div>
      <div className='sticky-container'>{renderRecommended()}</div>
    </StyledCard>
  )
}

export default Suggested

const StyledCard = styled.div`
  .followed-by {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .followed-by-p {
      display: flex;
      padding-left: 40px;
    }
  }
  .suggested-wrap {
    display: flex;
    width: 100%;
    height: 100px;
    padding: 0px 15px;
  }
  .left-suggested {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right-suggested {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 20px;
    justify-content: space-evenly;
  }
  .suggested-heading {
    font-weight: bold;
    font-size: 1.8rem;
    letter-spacing: 1.2px;
    text-align: center;
    color: dodgerblue;
  }
  min-height: 100vh;
  transition: opacity 0.4s ease;
  opacity: 1;
  width: 290px;
  @media (max-width: 1210px) {
    opacity: 0;
    display: none;
  }
  .sticky-container-too {
    position: sticky;
    top: 60px;
  }
  .sticky-container {
    position: sticky;
    top: 108px;
  }
  .recommended-follow-container {
    margin-bottom: 10px;
    background: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    padding: 10px;
    border-radius: 6px;
    .recommended-follow-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      h2 {
        /* margin-left: 10px; */
        font-size: 1.6rem;
        font-weight: 600;
        letter-spacing: 1px;
      }
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: block;
        margin: auto;
      }
    }
    .follow-button {
      text-align: center;
      button {
        padding: 10px 20px;
        font-weight: 700;
        border: transparent;
        border-radius: 50px;
        background-color: white;
        border: 1px solid dodgerblue;
        color: #3f65f2;
        cursor: pointer;
        transition: 200ms ease-out;
        font-size: 1.4rem;
        letter-spacing: 0.9;
        &:hover {
          background-color: #e8f4fb;
        }
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
