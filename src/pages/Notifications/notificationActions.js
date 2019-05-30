import * as type from './notificationTypes'
import axios from 'apis/axiosAPI'

export const fetchNotifications = NotificationsArr => ({
  type: type.FETCH_NOTIFICATIONS,
  payload: NotificationsArr,
})
export const readNotifications = () => async dispatch => {
  await axios.post(`/notifications/read`)
}
export const deleteNotifications = () => async dispatch => {
  await axios.delete(`/notifications/clear`)
  dispatch({ type: type.DELETE_NOTIFICATIONS })
}
