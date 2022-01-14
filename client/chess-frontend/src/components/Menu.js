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

  componentDidMount(){
    this.props.user(window.localStorage.getItem('username'), window.localStorage.getItem('token'), window.localStorage.getItem('refreshToken'))
  }

  main(e){
      e.preventDefault()
      that.props.history.push("/")
  }

  matchmaking(e){
      e.preventDefault()
      that.props.history.push("/matchmaking")
  }

  playWithBot(e){
      e.preventDefault()
      that.props.history.push("/botGames")
  }

  matches(e){
      e.preventDefault()
      that.props.history.push("/yourMatches")
  }

  watch(e){
      e.preventDefault()
      that.props.history.push("/watch")
  }

  statistics(e){
      e.preventDefault()
      that.props.history.push("/stats")
  }

  profile(e){
      e.preventDefault()
      that.props.history.push('/profile/'+ window.localStorage.getItem("username"))
  }

  signIn(e){
      e.preventDefault()
      if(e.target.innerText == "Sign Out"){
        that.logoutUser()
        that.props.loginDelete()
        that.props.registerDelete()
        that.props.user(window.localStorage.getItem('username'), window.localStorage.getItem('token'), window.localStorage.getItem('refreshToken'))
        that.props.history.push("/logout")
      }else {
        that.props.history.push("/signIn")
      }
  }

  loggedInUser(){
    var hiddenElements = document.getElementsByClassName("show-log-in")
    if(hiddenElements){
        for(var i = 0; i < hiddenElements.length; i++){
            hiddenElements[i].classList.remove("hidden")
        }
    }
    var username = document.getElementById("your-username")
    if(username){
        username.innerText = window.localStorage.getItem("username")
    }
    
    var logoutButton = document.getElementById("login-logout")
    if(logoutButton){
        logoutButton.innerText = "Sign Out"
    }

    var login = document.getElementById("login")
    var register = document.getElementById("register")
    if(login){
        login.classList.add("hidden")
    }

    if(register){
        register.classList.add("hidden")
    }
  }

  logoutUser(){
    that.hideUserUI()
  }

  hideUserUI(){
    var hiddenElements = document.getElementsByClassName("show-log-in")
    if(hiddenElements){
        for(var i = 0; i < hiddenElements.length; i++){
            hiddenElements[i].classList.add("hidden")
        }
    }

    var username = document.getElementById("your-username")
    if(username){
        username.innerText = ""
    }

    var logoutButton = document.getElementById("login-logout")
    if(logoutButton){
        logoutButton.innerText = "Sign In"
    }

   that.clearStorage()
  }

  clearStorage(){
      window.localStorage.clear()
  }

  checkResponse(){
    if(that.props.userState.response == "User is not authorized"){
        that.logoutUser()
    }
    if(that.props.userState.response == "User is authorized"){
        that.loggedInUser()
        return 
    }
    if(that.props.loging.username && that.props.loging.token && that.props.loging.refreshToken){
        window.localStorage.setItem("username", that.props.loging.username)
        window.localStorage.setItem("token", that.props.loging.token)
        window.localStorage.setItem("refreshToken", that.props.loging.refreshToken)
        that.loggedInUser()
        return
    }
    if(that.props.registering.username && that.props.registering.token && that.props.registering.refreshToken){
        window.localStorage.setItem("username", that.props.registering.username)
        window.localStorage.setItem("token", that.props.registering.token)
        window.localStorage.setItem("refreshToken", that.props.registering.refreshToken)
        that.loggedInUser()
        return 
    }

    if(window.localStorage.getItem("tried") == "login"){
        if(that.props.loging.error){
            that.hideUserUI()
            console.log("Handle loging errors here", that.props.loging.error)
        }
        return
    }else if(window.localStorage.getItem("tried") == "register"){
        if(that.props.registering.error){
            that.hideUserUI()
            console.log("Handle registering errors here", that.props.registering.error)
        }
        return
    }else{
        if(that.props.userState.error){
            that.hideUserUI()
            console.log("Handle check errors here", that.props.userState.error)
        }
        return
    }
  }
  
  render(){
      return (
          <nav className="navbar navbar-expand-xl bg-brown">
              <div>
                {this.checkResponse()}
              </div>
              <div className="container-fluid d-flex justify-sb">
                  <a href="#" onClick={this.main}><img src="/img/king.png" alt="logo" className="img-fluid img-sm" /></a>
                  {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button> */}
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ms-auto mb-2 mb-xl-0 d-flex">
                          
                          {/* <li className="nav-item dropdown">
                              <a className="dropdown-toggle nav-link hidden show-log-in" aria-expanded="false" data-bs-toggle="dropdown"
                                 href="#">Games</a>
                              <div className="dropdown-menu">
                                  <a className="dropdown-item hidden show-log-in" aria-current="page" href="#" onClick={this.matchmaking}>Matchmaking</a>
                                  <a className="dropdown-item" aria-current="page" href="#" onClick={this.playWithBot}>Play with Bot</a> 
                                  <a className="dropdown-item hidden show-log-in" aria-current="page" href="#" onClick={this.matches}>Your Matches</a>
                                  <a className="dropdown-item hidden show-log-in" aria-current="page" href="#" onClick={this.watch}>Watch Games</a>
                              </div>
                          </li> */}
                          <li className="nav-item hidden show-log-in">
                          <a className="nav-link hidden show-log-in white-font" aria-current="page" href="#" onClick={this.matchmaking}>Matchmaking</a>
                          </li>
                          <li className="nav-item hidden show-log-in">
                          <a className="nav-link hidden show-log-in white-font" aria-current="page" href="#" onClick={this.matches}>Your Matches</a>
                          </li>
                          {/* <li className="nav-item hidden show-log-in">
                              <a className="nav-link" href="#" onClick={this.statistics}>Statistics</a>
                          </li>
                          <li className="nav-item hidden show-log-in">
                            <a id="your-username" className="nav-link" href="#" onClick={this.profile}></a>
                          </li> */}
                          <li className="nav-item">
                              <a id="login-logout" className="nav-link white-font" href="#" onClick={this.signIn}>Sign In</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      )
  }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Menu)
  