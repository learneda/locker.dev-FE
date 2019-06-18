import * as type from './notificationTypes'
import axios from 'apis/axiosAPI'

export const readNotifications = () => async dispatch => {
  await axios.post(`/notifications/read`)
}
export const deleteNotifications = () => async dispatch => {
  await axios.delete(`/notifications/clear`)
  dispatch({ type: type.DELETE_NOTIFICATIONS })
}

export const getNotifications = () => async dispatch => {
  const notifications = await axios.get('/notifications')
  dispatch({ type: type.FETCH_NOTIFICATIONS, payload: notifications.data })
}
