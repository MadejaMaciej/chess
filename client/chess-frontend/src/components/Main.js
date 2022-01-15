import React, { 
    Component
  } from 'react'

import {
  socket
} from './App'
  
  var that

  class Main extends Component {
    constructor(props) {
      super(props)
      this.state = {
        playersOnline: 0,
        gamesOnline: 0
      }
      that = this
    }

    componentDidMount(){
      socket.emit('enteredMain')
      socket.on('displayPlayersOnline', props => {
        that.setState({
          playersOnline: props.playerCounter, 
          gamesOnline: props.gamesCounter
        })
      })
    }
  
    render(){
      return(
        <div className='black-bg main'>
          <div className='d-flex h-100'>
            <div className="w-50 h-100 white-right-border">
              <h2 className='text-right white-font title title-right'>Chess</h2>
              <div className='text-center'>
                <img src="/img/board.png" alt="Board" className="main-photo" />
              </div>
            </div>
            <div className="w-50 h-100">
              <h2 className='text-left white-font title title-left'>Play</h2>
              <h2 className='mt-5 text-center white-font p-4'>
                Welcome in King Capture!
                <br></br>
                <br></br>
                Platform where you can play
                speed chess with other 
                people around the world!
                <br></br>
                <br></br>
                To register or login please go 
                to login tab. 
                <br></br>
                <br></br>
                If you want to be anonymous
                you can play without registering.
                <br></br>
                <br></br>
                Good Luck and Have Fun!  
              </h2>
              <div className='d-flex p-5 justify-sb'>
                <p className='white-font'>Players Online: {this.state.playersOnline}</p>
                <p className='white-font'>Games Ongoing: {this.state.gamesOnline}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  export { Main }
  