import React from 'react'
import PropTypes from 'prop-types'
import ContentLoader from 'react-content-loader'
import styled from 'styled-components'

const FeedPlaceholder = props => {
  const { className } = props
  return (
    <ContentLoader
      className={className}
      height={580}
      width={580}
      speed={3}
      primaryColor='#f3f3f3'
      secondaryColor='#fcfcfc'
    >
      <circle cx='45' cy='40' r='30' />
      <rect x='90' y='15' rx='4' ry='4' width='100' height='12' />
      <rect x='90' y='37' rx='4' ry='4' width='255' height='24' />

      <circle cx='198' cy='21' r='3' />
      <rect x='209' y='16' rx='0' ry='0' width='70' height='10' />
      <circle cx='287' cy='21' r='2' />
      <rect x='294' y='17' rx='0' ry='0' width='50' height='8' />

      <rect x='390' y='15' rx='0' ry='0' width='170' height='24' />

      <rect x='0' y='90' rx='0' ry='0' width='580' height='326' />

      <rect x='15' y='428' rx='0' ry='0' width='280' height='36' />
      <rect x='15' y='482' rx='0' ry='0' width='165' height='30' />

      <rect x='400' y='484' rx='0' ry='0' width='165' height='30' />

      <rect x='0' y='525' rx='0' ry='0' width='580' height='1' />

      <circle cx='35' cy='552' r='20' />
      <rect x='65' y='532' rx='0' ry='0' width='330' height='2' />
      <rect x='65' y='572' rx='0' ry='0' width='330' height='2' />
      <rect x='65' y='532' rx='0' ry='0' width='2' height='40' />
      <rect x='395' y='532' rx='0' ry='0' width='2' height='40' />

      <rect x='435' y='532' rx='0' ry='0' width='130' height='40' />
    </ContentLoader>
  )
}

FeedPlaceholder.propTypes = {}

export default styled(FeedPlaceholder)`
  width: 580px;
  height: 600px;
  background: #fff;
  border: 1px solid powderblue;
`
