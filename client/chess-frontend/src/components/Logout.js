import React, { 
    Component
  } from 'react'
  
  var that

  class Logout extends Component {
    constructor(props) {
      super(props)
      that = this
    }

    componentDidMount(){
      this.clearStorage()
    }

    clearStorage(){
      window.localStorage.clear()
    }
  
    render(){
      return(
        <div>
          You have been logged out
        </div>
      )
    }
  }
  
  export { Logout }
  