import {
  AUTH_MODAL_TOGGLE,
  AUTH_MODAL_LOGIN,
  AUTH_MODAL_SIGNUP,
} from './authModalTypes'

//* Toggle Auth modal on user input
export const authModalToggle = () => ({ type: AUTH_MODAL_TOGGLE })
//* Select Auth-SignUp tab on user input
export const modalSignUp = () => ({ type: AUTH_MODAL_SIGNUP })
//* Select Auth-Login tab on user input
export const modalLogin = () => ({ type: AUTH_MODAL_LOGIN })
