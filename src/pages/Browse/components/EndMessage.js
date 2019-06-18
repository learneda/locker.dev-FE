import React from 'react'
import PropTypes from 'prop-types'

const EndMessage = props => {
  return (
    <div>
      <div>
        No Articles Matched Search Criteria
        <span role='img' aria-label='frown'>
          🙁
        </span>
      </div>
    </div>
  )
}

EndMessage.propTypes = {}

export default EndMessage
