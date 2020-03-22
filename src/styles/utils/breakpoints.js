const size = {
  iphone5: '320px',
  iphone6: '375px',
  iphone6p: '414px',
  ipad: '768px',
  ipadPro: '1024px',
  macbook: '1440px',
}

export const device = {
  iphone5: `(max-width: ${size.iphone5})`,
  iphone6: `(max-width: ${size.iphone6})`,
  iphone6p: `(max-width: ${size.iphone6p})`,
  ipad: `(max-width: ${size.ipad})`,
  ipadPro: `(max-width: ${size.ipadPro})`,
  macbook: `(max-width: ${size.macbook})`,
}
