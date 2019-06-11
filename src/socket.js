import openSocket from 'socket.io-client'
import { baseURL } from 'services'

const socket = openSocket(baseURL)
console.log('\nSOCKET 🦄', socket)
export default socket
