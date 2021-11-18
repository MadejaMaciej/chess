import React, { 
    Component
  } from 'react'
  
  var that

  class Logout extends Component {
    constructor(props) {
      super(props)
      that = this
    }

    async componentDidMount(){
      that.clearStorage()
    }

    clearStorage(){
        window.localStorage.removeItem("username")
        window.localStorage.removeItem("token")
        window.localStorage.removeItem("refreshToken")
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
  