import { GET_LOCKER } from '../actions/types'

export const lockerReducer = (state = [], action) => {
	switch (action.type) {
		case GET_LOCKER:
			console.log('in locker reducer', action.payload)
			return [ ...action.payload ]
			break
		default:
			return state
	}
}
