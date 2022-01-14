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

import Sign from './Sign'

import { Logout } from './Logout'
import { Matchmaking } from './Matchmaking'
import { Game } from './Game'
import { OngoingMatches } from './OngoingMatches'
import { UserProfile } from './UserProfile'
import { Stats } from './Stats'

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
            <Route exact path="/matchmaking" component={Matchmaking} />
            <Route exact path="/signIn" component={Sign} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/yourMatches" component={OngoingMatches} />
            <Route exact path="/stats" component={Stats} />
            <Route path="/profile/:username" component={UserProfile} />
            <Route path="/:id" component={Game} />
          </Switch>
        </div>
        <Route component={Footer} />
      </BrowserRouter>   
    )
  }
}

export { App, socket }
