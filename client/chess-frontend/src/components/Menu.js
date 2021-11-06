import React, { 
    Component
} from 'react'

import {
  mapStateToProps,
  mapDispatchToProps
} from '../functions/mapStateToProps'

import { connect } from 'react-redux'

var that
  
  class Menu extends Component {
    constructor(props) {
      super(props)
      that = this
    }

    test(){
      console.log(that.state)
    }

    componentDidMount(){
      this.props.checkIfValid(window.localStorage.getItem('username'), window.localStorage.getItem('token'), window.localStorage.getItem('refreshToken'))
    }
  
    render(){
      return(
        <div>
          {this.test()}
        </div>
      )
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Menu)
  