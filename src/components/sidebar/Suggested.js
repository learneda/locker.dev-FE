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
          <div>
            <MyLoader />
            <MyLoader />
            <MyLoader />
          </div>
        </>
      )
    } else {
      return suggested.map((ele, index) => (
        <div key={index} className='suggested-item'>
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
      <div className='recommended-follow-container'>
        <h2 className='suggested-heading'>Suggested Friends</h2>
        <div>{renderRecommended()}</div>
      </div>
    </StyledCard>
  )
}

export default Suggested

const StyledCard = styled.div`
  position: sticky;
  top: 60px;
  height: 420px;
  overflow: hidden;
  width: 100%;
  .followed-by {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-bottom: 20px;
    .followed-by-p {
      display: flex;
      justify-content: center;
      font-size: 1.2rem;
      letter-spacing: .8px;
      color:#657786;
    }
  }
  .suggested-wrap {
    display: flex;
    width: 100%;
    height: 100px;
    padding: 0px 0px 0 15px;
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
    padding: 0 0 0 15px;
    justify-content: space-evenly;
  }
  .suggested-heading {
    font-size: 1.6rem;
    line-height: 2.4rem;
    letter-spacing: 2px;
    text-align: center;
    color: #14171A;
    padding: 4px 0;
    background:  #e8f4fb;
    border-bottom: 1px solid #989ea4;
  }

  .suggested-item {
    border-bottom: 1px solid powderblue;
  }

  .recommended-follow-container {
    margin-bottom: 10px;
    background: #fff;
    /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 6px; */
    border: 1px solid powderblue;
    border-bottom: none;

  }
    .recommended-follow-info {
      display: flex;
      position: relative;
      flex-direction: column;
      align-items: flex-start;
      h2 {
        /* margin-left: 10px; */
        font-size: 1.6rem;
        letter-spacing: 1.5px;
      }
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid powderblue;
        display: block;
        margin: auto;
        bottom: 20px;
      }
    }
    .follow-button {
      text-align: center;
      position: relative;
      button {
        height: 25px;
        width: 75px;
        position: relative;
        bottom: 5px;
        border: transparent;
        border-radius: 50px;
        background-color: white;
        border: 1px solid dodgerblue;
        color: dodgerblue;
        cursor: pointer;
        transition: 200ms ease-out;
        font-size: 1.3rem;
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
