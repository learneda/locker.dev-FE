import React from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'

const FollowingPlaceHolder = props => {
  const { className } = props
  return (
    <ContentLoader
      className={className}
      height={160}
      width={270}
      speed={3}
      primaryColor='#f3f3f3'
      secondaryColor='#fcfcfc'
    >
      <rect x='25' y='15' rx='5' ry='5' width='220' height='50' />
    </ContentLoader>
  )
}

FollowingPlaceHolder.propTypes = {}

export default FollowingPlaceHolder
