import React, { 
    Component
} from 'react'

import {
    socket 
} from './App'

var that

class Game extends Component {
    constructor(props) {
      super(props)
      that = this
    }
  
    render(){
        return(
            <div>
                Chess
            </div>
        ) 
    }
  }
  
  export { Game }
  