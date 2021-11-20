import React, { 
    Component
} from 'react'
import { user } from '../actions/user-actions'

import {
    socket 
} from './App'

class Matchmaking extends Component {
    constructor(props) {
      super(props)
    }

    startMatchmaking(e){
        var gameType = e.target.value.split("+")
        if(gameType.length > 1){
            var minutes = gameType[0]/1
            var seconds = gameType[1]/1
            var username = window.localStorage.getItem("username")
            var token = window.localStorage.getItem("token")
            var refreshToken = window.localStorage.getItem("refreshToken")
            socket.emit("startMatchmaking", ({
                minutes,
                seconds,
                username,
                token,
                refreshToken
            }))
        }
    }
  
    render(){
        return(
            <div>
                Matchmaking
                <div className="row">
                    <div className="card speed-chess">
                        <button value="5+0" className="clickable card-button" onClick={this.startMatchmaking}>
                            5+0
                        </button>
                    </div>
                    <div className="card speed-chess">
                        <button value="5+3" className="clickable card-button" onClick={this.startMatchmaking}>
                            5+3
                        </button>
                    </div>
                </div>
            </div>
        ) 
    }
  }
  
  export { Matchmaking }
  