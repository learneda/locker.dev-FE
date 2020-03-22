import * as types from './notificationTypes'
export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_NOTIFICATIONS:
      return action.payload
    case types.DELETE_NOTIFICATIONS:
      return []
    case types.READ_NOTIFICATIONS:
      return state.map(notification => {
        notification.read = true
        return notification
      })
    case types.RECEIVING_NOTIFICATION:
      return [...state, action.payload]
    default:
      return state
  }
}
