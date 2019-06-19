import * as type from './notificationTypes'
export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case type.FETCH_NOTIFICATIONS:
      return action.payload
    case type.DELETE_NOTIFICATIONS:
      return []
    case type.READ_NOTIFICATIONS:
      return state.map(notification => {
        notification.read = true
        return notification
      })
    case type.RECEIVING_NOTIFICATION:
      return [...state, ...action.payload]
    default:
      return state
  }
}
