import React, { 
    Component
} from 'react'

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

    componentDidMount(){
        socket.on('gameCreated', (props) => {
            this.props.history.push(props.UUID)
        })
    }
  
    render(){
        return(
            <div className='light-bg full-bg'>
                <h2 className='text-center py-4'>Matchmaking</h2>
                <div className='max-width mx-auto'>
                    <div className="d-flex">
                        <div className="card speed-chess mx-5">
                            <button value="5+0" className="clickable card-button full" onClick={this.startMatchmaking}>
                                5+0
                            </button>
                        </div>
                        <div className="card speed-chess mx-5">
                            <button value="5+3" className="clickable card-button full" onClick={this.startMatchmaking}>
                                5+3
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
  }
  
  export { Matchmaking }
  