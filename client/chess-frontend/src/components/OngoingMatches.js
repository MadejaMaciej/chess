import React, { 
    Component
} from 'react'

import {
    socket 
} from './App'

var that

class OngoingMatches extends Component {
    constructor(props) {
      super(props)
      that = this
      this.state = {
          matches: [<div></div>]
      }
    }

    componentDidMount(){
        socket.emit('getMyMatches', {
            username: window.localStorage.getItem('username'),
            token: window.localStorage.getItem('token'),
            refreshToken: window.localStorage.getItem('refreshToken')
        })

        socket.on('matches', (props) => {
            var jsxArr = []
            for(let i = 0; i < props.length; i++){
                jsxArr.push(<div className='mx-auto text-center'>
                    <p><b>Game ID: {props[i].UUID}</b></p>
                    <button className='btn own-btn' onClick={that.rejoinGame} id={props[i].UUID}>Rejoin</button>
                </div>)
            }

            that.setState({
                matches: jsxArr
            })
        })
    }

    rejoinGame(e){
        that.props.history.push(e.target.id)
    }
  
    render(){
        return(
            <div className='full-bg light-bg'>
                <h2 className='text-center py-4'>Your games</h2>
                <div className='d-flex'>
                    {this.state.matches}
                </div>
            </div>
        ) 
    }
  }
  
  export { OngoingMatches }
  