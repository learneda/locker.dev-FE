import * as type from 'pages/Notifications/notificationTypes'
import { FETCH_NOTIFICATIONS } from 'appTypes'
export const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return action.payload
    case type.DELETE_NOTIFICATIONS:
      return []
    default:
      return state
  }
}
