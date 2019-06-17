import GlobalStyle from './cssReset.js'
import { css } from 'styled-components'
export default GlobalStyle
//* variables
export const bgColor = '#E6ECF0'
export const hoverBg = '#D3D7E7'
export const buttonBg = '#4163f2'
export const primary = '#29A3EF'
export const secondary = '#2696DD'
export const white = '#FFFFFF'
export const black = '#141619'
export const active = '#2999C5'
export const menu = '#667785'
export const navBottom = '#BFBFBF'
export const subNavBottom = '#D3D3D3'
export const btnBgHover = '#E8F4F9'
export const heart = '#DE2960'
export const bgDark = '#10171D'
//* Flexbox custom layout
export const customLayout = (justify = 'flex-start', align = 'flex-start') =>
  `display: flex;
  justify-content: ${justify};
  align-items: ${align};`

export const customWrapper = (width = '100%', margin = 0) =>
  `width: ${width};
  margin: ${margin};`

export const customContainer = (width = '100%', bg = bgColor) => `
  width: ${width};
  background-color: ${bg};
`

//* Word-based truncate
export const truncateText = (content, limit = 10) => {
  if (content.split(' ').length < limit) {
    return content
  } else {
    content = content.split(' ').slice(0, limit)
    content = content.join(' ')
    return content + '...'
  }
}

//* Character-based truncate
//* Regex: multiple whitespace replaced with single space
//* Motivation: multiple whitespace screws with limit check
export const smartTruncate = (content, limit = 100, delimiter = '...') => {
  if (!content) {
    return content
  }
  return content.length <= limit
    ? content
    : content
        .replace(/\s\s+/g, ' ')
        .substr(0, limit - delimiter.length)
        .concat(delimiter)
}
