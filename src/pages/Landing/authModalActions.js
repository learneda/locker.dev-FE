import {
  AUTH_MODAL_OPEN,
  AUTH_MODAL_CLOSE,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP,
} from './authModalTypes'

//* Open Auth modal on user input
export const authModalOpen = () => ({ type: AUTH_MODAL_OPEN })
//* Close Auth modal on user input
export const authModalClose = () => ({ type: AUTH_MODAL_CLOSE })
//* Select Auth-SignUp tab on user input
export const modalSignUp = () => ({ type: AUTH_MODAL_SIGNUP })
//* Select Auth-Login tab on user input
export const modalLogin = () => ({ type: AUTH_MODAL_LOGIN })
