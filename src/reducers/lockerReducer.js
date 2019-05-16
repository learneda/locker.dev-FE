import { GET_LOCKER } from '../actions/types'

export const lockerReducer = (state = [], action) => {
	switch (action.type) {
		case GET_LOCKER:
			return [ ...action.payload ]
			break
		default:
			return state
	}
}
