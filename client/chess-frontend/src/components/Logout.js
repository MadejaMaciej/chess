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
        <div className='black-bg main'>
          <div>
            <h2 className='text-center white-font p-5'>You have been succesfully logged out.</h2>
          </div>
        </div>
      )
    }
  }
  
  export { Logout }
  