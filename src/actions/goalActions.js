import axios from 'apis/axiosAPI'
import * as types from './goalTypes'

export const createGoal = goal => async dispatch => {
  const response = await axios.post('/goals', goal)
  dispatch({ type: types.CREATE_GOAL, payload: response.data })
}

export const fetchGoals = userId => async dispatch => {
  const response = await axios.get(`/goals/users/${userId}`)
  dispatch({ type: types.FETCH_GOALS, payload: response.data })
}

export const deleteGoal = (userId, goalId) => async dispatch => {
  const response = await axios.delete(`/goals/${goalId}`)
  dispatch({ type: types.DELETE_GOAL, payload: response.data })
}

export const fetchAllGoals = () => async dispatch => {
  const response = await axios.get('/goals')
  dispatch({ type: types.FETCH_ALL_GOALS, payload: response.data })
}
