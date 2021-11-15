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
    this.props.checkIfValid(window.localStorage.getItem('username'), window.localStorage.getItem('token'), window.localStorage.getItem('refreshToken'))
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
      that.props.history.push("/signIn")
  }

  responseReceived(){
      console.log(that.props, "Menu")
  }
  
  render(){
      return (
          <nav className="navbar navbar-expand-xl bg-dark">
              <div>
                {this.responseReceived()}
              </div>
              <div className="container-fluid">
                  <a href="#" onClick={this.main}><img src="/img/king.png" alt="logo" className="img-fluid img-sm" /></a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav ms-auto mb-2 mb-xl-0">
                          
                          <li className="nav-item dropdown">
                              <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown"
                                 href="#">Games</a>
                              <div className="dropdown-menu">
                                  <a className="dropdown-item" aria-current="page" href="#" onClick={this.matchmaking}>Matchmaking</a>
                                  <a className="dropdown-item" aria-current="page" href="#" onClick={this.playWithBot}>Play with Bot</a>
                                  <a className="dropdown-item" aria-current="page" href="#" onClick={this.matches}>Your Matches</a>
                                  <a className="dropdown-item" aria-current="page" href="#" onClick={this.watch}>Watch Gamess</a>
                              </div>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#" onClick={this.statistics}>Statistics</a>
                          </li>
                          <li className="nav-item">
                            <a id="your-username" className="nav-link" href="#" onClick={this.profile}></a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="#" onClick={this.signIn}>Sign In</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      )
  }
}
  export default connect(mapStateToProps, mapDispatchToProps)(Menu)
  