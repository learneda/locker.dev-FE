import React from 'react'

export default function Like({ id, handleSaveToMyBookmarks, url }) {
  return (
    <div className='like' onClick={() => handleSaveToMyBookmarks(id, url)}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='17'
        height='17'
        viewBox='0 0 24 24'
        fill='none'
        stroke={'#262626'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path
          // fill={liked ? '#ff3144' : null}
          d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
        />
      </svg>
    </div>
  )
}
