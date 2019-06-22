import * as types from './authModalTypes'

//* Open Auth modal on user input
export const authModalOpen = () => ({ type: types.AUTH_MODAL_OPEN })
//* Close Auth modal on user input
export const authModalClose = () => ({ type: types.AUTH_MODAL_CLOSE })
//* Select Auth-SignUp tab on user input
export const modalSignUp = () => ({ type: types.AUTH_MODAL_SIGNUP })
//* Select Auth-Login tab on user input
export const modalLogin = () => ({ type: types.AUTH_MODAL_LOGIN })
