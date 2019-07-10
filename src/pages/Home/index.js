import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import CookieBanner from 'react-cookie-banner'
import styled from 'styled-components'
import Feed from 'containers/Feed'
import Sidebar from 'components/sidebar/Sidebar'
import Tagbar from 'components/sidebar/Tagbar'
import Suggested from 'components/sidebar/Suggested'
import Footer from 'components/sidebar/Footer'
import * as socialActions from 'actions/socialActions'
import * as homeActions from './store/homeActions'

const Home = props => {
  const {
    auth,
    user,
    feed,
    following,
    followers,
    suggested,
    topTags,
    myTags,
    fetchFollowing,
    fetchFollowers,
    fetchSuggested,
    followAUser,
    fetchFeed,
    fetchMoreFeed,
    fetchTopTags,
    fetchMyTags,
    fetchPostCount,
    postCount,
  } = props
  const dispatch = useDispatch()

  useEffect(() => {
    if (!following.length) {
      fetchFollowing(auth.id)
      fetchFollowers(auth.id)
      fetchSuggested(auth.id)
    }
    if (!topTags.length) {
      fetchTopTags()
      fetchMyTags()
    }
    fetchFeed()
    fetchPostCount(auth.id)
    return () => dispatch({ type: 'RESET_POSTS' })
  }, [])

  const message =
    'This site uses cookies to provide you with a great user experience. By using LearnLocker, you accept our use of cookies.'

  const styles = {
    banner: {
      height: 60,
      position: 'fixed',
      left: '0px',
      bottom: '0px',
      background: '#e8f4fb  20px 50% no-repeat',
      fontSize: '1.4rem',
      fontWeight: 'thin',
      display: 'flex',
      alignItems: 'center',
      borderTop: '1px solid powderblue',
    },
    button: {
      border: '1px solid dodgerblue',
      borderRadius: 4,
      width: 66,
      height: 32,
      lineHeight: '32px',
      background: 'transparent',
      color: 'dodgerblue',
      fontSize: '14px',
      fontWeight: 600,
      opacity: 1,
      right: 20,
      marginTop: -18,
    },
    message: {
      display: 'block',
      padding: '9px 67px',
      lineHeight: 1.5,
      textAlign: 'left',
      marginRight: 244,
      color: '#141619',
    },
    link: {
      textDecoration: 'none',
      fontWeight: 'bold',
      color: 'orangered',
      fontSize: '1.2rem',
    },
  }
  return (
    <Container>
      <CookieBanner
        dismissOnScrollThreshold={10}
        message={message}
        styles={styles}
        dismissOnScrollThreshold={10}
        link={<a href='#'>Cookie Policy</a>}
      />
      <WrapperLeft>
        <Sidebar
          auth={auth}
          user={user}
          postCount={postCount}
          followers={followers}
          following={following}
        />
        <Tagbar topTags={topTags} myTags={myTags} />
      </WrapperLeft>
      <Feed
        posts={feed.posts}
        offset={feed.offset}
        hasmore={feed.hasmore}
        fetchMoreFeed={fetchMoreFeed}
      />
      <WrapperRight>
        <Suggested
          auth={auth}
          suggested={suggested}
          fetchSuggested={fetchSuggested}
          fetchFollowing={fetchFollowing}
          followAUser={followAUser}
        />
        <Footer />
      </WrapperRight>
    </Container>
  )
}
const mapStateToProps = ({ auth, user, home, social }) => ({
  auth,
  user,
  feed: home,
  topTags: home.topTags,
  myTags: home.myTags,
  ...social,
})

export default connect(
  mapStateToProps,
  {
    ...socialActions,
    ...homeActions,
  }
)(withRouter(Home))

Home.propTypes = {
  auth: PropTypes.any,
  user: PropTypes.object.isRequired,
  feed: PropTypes.object.isRequired,
  following: PropTypes.arrayOf(PropTypes.object).isRequired,
  followers: PropTypes.arrayOf(PropTypes.object).isRequired,
  suggested: PropTypes.arrayOf(PropTypes.object).isRequired,
  topTags: PropTypes.arrayOf(PropTypes.object).isRequired,
  myTags: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchFollowing: PropTypes.func.isRequired,
  fetchFollowers: PropTypes.func.isRequired,
  fetchSuggested: PropTypes.func.isRequired,
  followAUser: PropTypes.func.isRequired,
  fetchFeed: PropTypes.func.isRequired,
  fetchMoreFeed: PropTypes.func.isRequired,
  fetchTopTags: PropTypes.func.isRequired,
  fetchMyTags: PropTypes.func.isRequired,
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 15px auto 0px;
  padding: 0 15px 30px;
  /* SidebarRight vanishes */
  @media (max-width: 1180px) {
    justify-content: space-around;
  }
  /* SidebarLeft vanished */
  @media (max-width: 920px) {
    margin: -1px auto;
  }
  /* Mobile-Feed 100% width */
  @media (max-width: 620px) {
    padding: 0;
  }
`
const WrapperLeft = styled.div`
  position: relative;
  width: 280px;
  opacity: 1;
  transition: opacity 300ms ease;
  @media (max-width: 920px) {
    opacity: 0;
    display: none;
  }
`

const WrapperRight = styled.div`
  position: relative;
  width: 260px;
  opacity: 1;
  transition: opacity 300ms ease;
  @media (max-width: 1180px) {
    opacity: 0;
    display: none;
  }
`
