import * as types from 'actions/socialTypes'

const initialState = {
  following: [],
  followers: [],
  suggested: [],
}

export const socialReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FOLLOW_A_USER:
      return {
        ...state,
        following: [...state.following, { id: action.payload.friend_id }],
      }
    case types.UNFOLLOW_A_USER:
      return {
        ...state,
        following: state.following.filter(
          friend => friend.id !== Number(action.payload.friend_id)
        ),
      }
    case types.FETCH_SUGGESTED:
      return { ...state, suggested: action.payload }
    case types.FETCH_FOLLOWERS:
      return { ...state, followers: action.payload }
    case types.FETCH_FOLLOWING:
      return { ...state, following: action.payload }
    default:
      return state
  }
}
