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
      socket.on('displayPlayersOnline', props => {
        that.setState({
          playersOnline: props.playerCounter, 
          gamesOnline: props.gamesCounter
        })
      })
    }
  
    render(){
      return(
        <div>
          
        </div>
      )
    }
  }
  
  export { Main }
  