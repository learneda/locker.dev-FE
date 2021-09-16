import { io } from 'socket.io-client'
import { baseURL } from 'services'

const socket = io(baseURL, {
  withCredentials: true,
})

export default socket
