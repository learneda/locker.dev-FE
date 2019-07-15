import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { HelpScreen } from 'components/Screens'
import BookmarkSVG from 'assets/svg/bookmark-drawing.svg'
import { ScrollToTopOnMount } from 'components/Utils'
import { SubNav } from 'components/Bars'
import Card from 'components/Card'
import EmptyCard from 'components/Card/EmptyCard'
import { pickType } from 'helpers'
import { fetchCollections } from 'actions'

const Locker = props => {
  const columns = 3
  const { location } = props
  const [typeFilter, setTypeFilter] = useState('')

  const dispatch = useDispatch()
  const { searchTerm, collections } = useSelector(
    ({ search, collections }) => ({
      searchTerm: search.searchTerm,
      collections,
    })
  )

  useEffect(() => {
    dispatch(fetchCollections())
    setTypeFilter(pickType(location))
  }, [location.pathname])

  // Filters based on searchTerm
  if (collections.length) {
    const searchedCollections = collections.filter(post => {
      return (
        (post.title &&
          post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.thumbnail_url &&
          post.thumbnail_url
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (post.description &&
          post.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.root_url &&
          post.root_url.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })
    // Filters based on type
    const filterTypeCollections = searchedCollections.filter(post => {
      if (typeFilter === '0') {
        return true
      } else {
        return post.type_id === typeFilter
      }
    })
    const mod = filterTypeCollections.length % columns
    return (
      <>
        <ScrollToTopOnMount />
        <SubNav />
        <Container>
          {filterTypeCollections
            .map((post, index) => {
              return <Card type='locker' key={index} item={post} />
            })
            .concat(
              mod === 2 ? (
                <EmptyCard key={filterTypeCollections.length} />
              ) : mod === 1 ? (
                [
                  <EmptyCard key={filterTypeCollections.length} />,
                  <EmptyCard key={filterTypeCollections.length + 1} />,
                ]
              ) : null
            )}
        </Container>
      </>
    )
  }

  if (collections.length === 0) {
    return (
      <HelpScreen
        imgSource={BookmarkSVG}
        headerText='Your saved courses and articles will be stored here.'
      />
    )
  }
}

export default withRouter(Locker)

Locker.propTypes = {
  location: PropTypes.object.isRequired,
}

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 1218px) {
    justify-content: space-evenly;
  }
`
