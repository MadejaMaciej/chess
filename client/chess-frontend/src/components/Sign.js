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

    passwordsNotIdentical(){
      console.log("Passwords not identical")
    }

    checkBoxNotChecked(){
      console.log("Checkbox not checked")
    }

    checkIfCheckboxChecked(){
      var checkbox = document.getElementById("checkbox")
      if(checkbox){
        return checkbox.checked 
      }
      return false
    }

    signUp(){
      var loginInput = document.getElementById("rusername")
      var passwordInput = document.getElementById("rpassword")
      var repeatPasswordInput = document.getElementById("rpassword-repeat")
      if(loginInput && passwordInput && repeatPasswordInput){
        if(that.checkIfCheckboxChecked()){
          if(passwordInput.value == repeatPasswordInput.value){
            that.props.register(loginInput.value, passwordInput.value)
            window.localStorage.setItem("tried", "register")
          }else{
            that.passwordsNotIdentical()
          }
        }else{
          that.checkBoxNotChecked()
        }
      }
    }

    signIn(){
      var loginInput = document.getElementById("lusername")
      var passwordInput = document.getElementById("lpassword")
      if(loginInput && passwordInput){
        that.props.login(loginInput.value, passwordInput.value)
        window.localStorage.setItem("tried", "login")
      }
    }
  
    render(){
      return(
        <div className="row">
          <div className="left login col-6-sm">
            <label>
              Username
              <input id="lusername" className="own-input" placeholder="Username" type="text"/>
            </label>
            <label>
              Password
              <input id="lpassword" className="own-input" type="password"/>
            </label>
            <button className="own-btn btn" onClick={this.signIn}>Sign In</button>
          </div>
          <div className="right register col-6-sm">
          <label>
              Username
              <input id="rusername" className="own-input" placeholder="Username" type="text"/>
            </label>
            <label>
              Password
              <input id="rpassword" className="own-input" type="password" />
            </label>
            <label>
              Repeat Password
              <input id="rpassword-repeat" className="own-input" type="password" />
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
  