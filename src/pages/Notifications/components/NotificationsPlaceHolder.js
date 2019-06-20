import React from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const NotificationsPlaceHolder = props => {
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
      <rect x='25' y='45' rx='5' ry='5' width='220' height='40' />
      <rect x='25' y='75' rx='5' ry='5' width='220' height='40' />
      <rect x='25' y='105' rx='5' ry='5' width='220' height='40' />
    </ContentLoader>
  )
}

NotificationsPlaceHolder.propTypes = {}

export default styled(NotificationsPlaceHolder)`
  width: 500px;
  height: 50px;
  background: white;
  border-radius: 6px;
`
