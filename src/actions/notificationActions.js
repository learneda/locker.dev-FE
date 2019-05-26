export const fetchNotifications = NotificationsArr => ({
  type: FETCH_NOTIFICATIONS,
  payload: NotificationsArr,
})
export const readNotifications = () => async dispatch => {
  await axios.post(`/notifications/read`)
}
export const deleteNotifications = () => async dispatch => {
  await axios.delete(`/notifications/clear`)
  dispatch({ type: DELETE_NOTIFICATIONS })
}
