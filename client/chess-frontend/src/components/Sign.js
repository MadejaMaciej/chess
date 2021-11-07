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

    signUp(){

    }

    signIn(){

    }
  
    render(){
      return(
        <div className="row">
          <div className="left login col-6-sm">
            <label>
              Username
              <input id="username" className="own-input" placeholder="Username" type="text"/>
            </label>
            <label>
              Password
              <input id="password" className="own-input" type="password"/>
            </label>
            <button className="own-btn btn" onClick={this.signIn}>Sign In</button>
          </div>
          <div className="right register col-6-sm">
          <label>
              Username
              <input id="username" className="own-input" placeholder="Username" type="text"/>
            </label>
            <label>
              Password
              <input id="password" className="own-input" type="password" />
            </label>
            <label>
              Repeat Password
              <input id="password-repeat" className="own-input" type="password" />
            </label>
            <label>
              <input id="checkbox" type="checkbox" required/>
              I read and agree with Privacy Policy and Terms and Conditions
            </label>
            <button className="own-btn btn" onClick={this.signUp}>Sign Up</button>
          </div>
        </div>
      )
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sign)
  