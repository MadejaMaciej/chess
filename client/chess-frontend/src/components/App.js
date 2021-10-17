import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import {
  backendAddress
} from '../functions/enviroment'

const backendAdd = backendAddress || "http://localhost:3000/"
var socket

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {socket: socketIOClient(backendAdd, {'transports': ['websocket']})}
    socket = this.state.socket
  }

  render(){
    return(
      <div>
        
      </div>
    )
  }
}

export { App, socket }
