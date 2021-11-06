import React, { 
  Component
} from 'react'
import socketIOClient from 'socket.io-client'
import { 
  BrowserRouter, 
  Route, 
  Link, 
  Switch 
} from 'react-router-dom';
import {
  backendAddress
} from '../functions/enviroment'

import Menu from './Menu'

import {
  Footer
} from './Footer'

import {
  Main
} from './Main'

const backendAdd = backendAddress || "http://localhost:3000/"
var socket, that

class App extends Component {
  constructor(props) {
    super(props)
    that = this
    this.state = {
      socket: socketIOClient(backendAdd, {'transports': ['websocket']}),
  }
    socket = this.state.socket
  }

  render(){
    return(
      <BrowserRouter>
        <Route component={Menu} />
        <div className="background">
          <Switch>
            <Route exact path="/" component={Main} />
          </Switch>
        </div>
        <Route component={Footer} />
      </BrowserRouter>   
    )
  }
}

export { App, socket }
