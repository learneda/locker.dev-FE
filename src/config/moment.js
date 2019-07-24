import moment from 'moment'

moment.updateLocale('en', {
  relativeTime: {
    future: '%s',
    past: '%s ago',
    s: 'soon!!!',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
})

export { moment }
