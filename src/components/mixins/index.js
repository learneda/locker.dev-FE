import GlobalStyle from './cssReset.js'
export default GlobalStyle
// variables
export const bgColor = '#e6e9f3';
export const hoverBg = '#d3d7e7';
export const buttonBg = '#4163f2';

// Flexbox custom layout
export const customLayout = (justify = 'flex-start', align = 'flex-start') =>
  `display: flex;
  justify-content: ${justify};
  align-items: ${align};`;

export const customWrapper = (
  width = '100%',
  margin = 0
  // maxWidth = '1200px'
) =>
  `width: ${width};
  margin: ${margin};`;

export const customContainer = (width = '100%', bg = bgColor) => `
  width: ${width};
  background-color: ${bg};
`;

export const truncateText = (content, limit = 10) => {
  if (content.split(' ').length < limit) {
    return content;
  } else {
    content = content.split(' ').slice(0, limit);
    content = content.join(' ');
    return content + '...';
  }
};
