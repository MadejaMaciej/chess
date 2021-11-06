import React, { 
    Component
} from 'react'

import {
  mapStateToProps,
  mapDispatchToProps
} from '../functions/mapStateToProps'

import { connect } from 'react-redux'

var that
  
  class Sign extends Component {
    constructor(props) {
      super(props)
      that = this
    }

    test(){
      console.log(that.state)
    }
  
    render(){
      return(
        <div>
          {this.test()}
        </div>
      )
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sign)
  