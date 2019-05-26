import * as type from 'actions/notificationTypes

export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case type.FETCH_NOTIFICATIONS:
      return action.payload
    case type.DELETE_NOTIFICATIONS:
      return []
    default:
      return state
  }
}
