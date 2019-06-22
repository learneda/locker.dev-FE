import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom'
import { elevations } from 'styles/utils'
const SubNav = ({ match, location }) => {
  return (
    <Container>
      <Tabs>
        <Tab>
          <NavLink
            to={`${match.url}/articles`}
            className={location.pathname === '/browse' ? 'active' : null}
          >
            Article
          </NavLink>
        </Tab>
        <Tab>
          <NavLink exact to={`${match.url}/courses`}>
            Course
          </NavLink>
        </Tab>
        <Tab>
          <NavLink to={`${match.url}/videos`}>Video</NavLink>
        </Tab>
        <Tab>
          <NavLink to={`${match.url}/podcasts`}>Podcast</NavLink>
        </Tab>
        <Tab>
          <NavLink to={`${match.url}/books`}>Book</NavLink>
        </Tab>
      </Tabs>
    </Container>
  )
}

SubNav.propTypes = {}

export default withRouter(SubNav)

const Container = styled.div`
  position: sticky;
  height: 50px;
  width: 100%;
  top: 50px;
  z-index: 1;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
`

const Tabs = styled.ul`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  background: #ffffff;
`
const Tab = styled.li`
  height: 100%;
  transition: 300ms ease;
  .active {
    font-weight: 900;
    color: dodgerblue;
    border-bottom: 2px solid dodgerblue;
  }
  a {
    border-bottom: 2px solid transparent;
    color: #66757f;
    font-size: 1.4rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    transition: 300ms ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 0 2rem;
    transition: 300ms ease;
    &:hover {
      cursor: pointer;
      border-bottom: 2px solid dodgerblue;
    }
  }
`
