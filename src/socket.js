import openSocket from 'socket.io-client'
import { baseURL } from 'services'

const socket = openSocket(baseURL)
export default socket
