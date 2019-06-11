import * as type from './notificationTypes'
import axios from 'apis/axiosAPI'

export const readNotifications = () => async dispatch => {
  await axios.post(`/notifications/read`)
}
export const deleteNotifications = () => async dispatch => {
  await axios.delete(`/notifications/clear`)
  dispatch({ type: type.DELETE_NOTIFICATIONS })
}
