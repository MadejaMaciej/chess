import React, { 
    Component
} from 'react'

import {
    socket 
} from './App'

import Chessboard from 'chessboardjsx'
import * as Chess from 'chess.js'

var that, chess, to, from, pieces, justShown

class Game extends Component {
    constructor(props) {
      super(props)
      that = this
      this.state = {
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          color: 'white',
          spectator: false,
          fromSquare: '',
          toSquare: '',
          piece: '',
          promotion: false,
          finished: false,
          playerWhite: "",
          playerBlack: ""
      }
      chess = new Chess(this.state.fen)
    }

    showChoosingModal(pl){
        if(pl == 0){
            var el = document.getElementById("promotion-white")
            if(el){
                el.classList.remove("hidden")
            }
        }else{
            var el2 = document.getElementById("promotion-black")
            if(el2){
                el2.classList.remove("hidden")
            }
        }
    }

    moveFromModal(piece){
        if(that.state.spectator || that.state.finisehd){
            return 
        }
        var object = {
            sourceSquare: that.state.fromSquare,
            targetSquare: that.state.toSquare,
            piece: that.state.piece
        }
        var id = window.location.pathname.split('/')
        socket.emit('moved', {
            UUID: id[1],
            username: window.localStorage.getItem('username'),
            token: window.localStorage.getItem('token'),
            refreshToken: window.localStorage.getItem('refreshToken'),
            moveObject: object,
            promotion: true,
            promoteTo: piece.target.id
        })
        that.hideChoosingModal()
    }

    hideChoosingModal(){
        var el = document.getElementById("promotion-white")
        if(el){
            el.classList.add("hidden")
        }

        var el2 = document.getElementById("promotion-black")
        if(el2){
            el2.classList.add("hidden")
        }

        that.clearMoveState()
    }

    clearMoveState(){
        that.setState({
            fromSquare: "",
            toSquare: "",
            piece: "",
            promotion: false
        })
    }

    renderModals(toRender){
        if(that.state.spectator || that.state.finisehd){
            return 
        }
        if(toRender == 0){
            return (
                <div id="promotion-white" className="alligned-middle board-bg text-center px-5 py-5 radius small-padding-mobile hidden">
                    <h2 className="white-font text-center my-2">Choose a Piece!</h2>
                    <div className="d-flex">
                        <img id="r" src="/img/wr.png" alt="White rook" onClick={that.moveFromModal} className="small-image text-center mx-2 my-2 clickable" />
                        <img id="n" src="/img/wn.png" alt="White knight" onClick={that.moveFromModal} className="small-image text-center mx-2 my-2 clickable" />
                        <img id="b" src="/img/wb.png" alt="White bishop" onClick={that.moveFromModal} className="small-image text-center mx-2 my-2 clickable" />
                        <img id="q" src="/img/wq.png" alt="White queen" onClick={that.moveFromModal} className="small-image text-center mx-2 my-2 clickable" />
                    </div>
                </div>
            )
        }else{
            return (
                <div id="promotion-black" className="alligned-middle board-bg text-center px-5 py-5 radius small-padding-mobile hidden">
                    <h2 className="white-font text-center my-2">Choose a Piece!</h2>
                    <div className="d-flex">
                        <img id="r" src="/img/br.png" alt="Black rook" onClick={that.moveFromModal} className="small-image text-center mx-2 my-2 clickable" />
                        <img id="n" src="/img/bn.png" alt="Black knight" onClick={that.moveFromModal} className="small-image text-center mx-2 my-2 clickable" />
                        <img id="b" src="/img/bb.png" alt="Black bishop" onClick={that.moveFromModal} className="small-image text-center mx-2 my-2 clickable" />
                        <img id="q" src="/img/bq.png" alt="Black queen" onClick={that.moveFromModal} className="small-image text-center mx-2 my-2 clickable" />
                    </div>
                </div>
            )
        }
    }

    move(object){
        if(that.state.spectator || that.state.finisehd){
            return 
        }

        if(that.state.color == 'white'){
            if(chess.turn() == 'b'){
                return
            }
        }else{
            if(chess.turn() == 'w'){
                return
            }
        }

        chess.move({from: object.sourceSquare, to: object.targetSquare})
        that.setState({fen: chess.fen()})   

        if(object.piece == 'bP' && (object.targetSquare == 'a1' || object.targetSquare == 'b1' || object.targetSquare == 'c1' || object.targetSquare == 'd1' || object.targetSquare == 'e1' || object.targetSquare == 'f1' || object.targetSquare == 'g1' || object.targetSquare == 'h1')){
            that.setState({
                fromSquare: object.sourceSquare,
                toSquare: object.targetSquare,
                piece: object.piece,
                promotion: true
            })
            that.showChoosingModal(1)
            return
        }else if(object.piece == 'wP' && (object.targetSquare == 'a8' || object.targetSquare == 'b8' || object.targetSquare == 'c8' || object.targetSquare == 'd8' || object.targetSquare == 'e8' || object.targetSquare == 'f8' || object.targetSquare == 'g8' || object.targetSquare == 'h8')){
            that.setState({
                fromSquare: object.sourceSquare,
                toSquare: object.targetSquare,
                piece: object.piece,
                promotion: true
            })
            that.showChoosingModal(0)
            return
        }

        var id = window.location.pathname.split('/')
        socket.emit('moved', {
            UUID: id[1],
            username: window.localStorage.getItem('username'),
            token: window.localStorage.getItem('token'),
            refreshToken: window.localStorage.getItem('refreshToken'),
            moveObject: object,
            promotion: false,
            promoteTo: null
        })
    }

    showMoves(square){
        if(that.state.spectator || that.state.finisehd){
            return 
        }
        that.removeHighlightSquare()
        that.highlightMoves(square)
        var piece = chess.get(square)
        if(piece != null){
            if(piece.color == "w"){
                if(that.state.color == 'white'){
                    pieces = "w"+piece.type.toUpperCase()
                    from = square
                }else{
                    if (from == null){
                        return
                    }
                    to = square
                }
            }else{
                if(that.state.color == 'white'){
                    if (from == null){
                        return
                    }
                    to = square
                }else{
                    pieces = "b"+piece.type.toUpperCase()
                    from = square
                }
            }
        }else{
            if (from == null){
                return
            }
            to = square
        }

        if(to && from ){
            var object = {
                sourceSquare: from,
                targetSquare: to,
                piece: pieces
            }

            to = null
            from = null
            pieces = null
            justShown = true

            if(object.piece == 'bP' && (object.targetSquare == 'a1' || object.targetSquare == 'b1' || object.targetSquare == 'c1' || object.targetSquare == 'd1' || object.targetSquare == 'e1' || object.targetSquare == 'f1' || object.targetSquare == 'g1' || object.targetSquare == 'h1')){
                that.setState({
                    fromSquare: object.sourceSquare,
                    toSquare: object.targetSquare,
                    piece: object.piece,
                    promotion: true
                })
                that.showChoosingModal(1)
                return
            }else if(object.piece == 'wP' && (object.targetSquare == 'a8' || object.targetSquare == 'b8' || object.targetSquare == 'c8' || object.targetSquare == 'd8' || object.targetSquare == 'e8' || object.targetSquare == 'f8' || object.targetSquare == 'g8' || object.targetSquare == 'h8')){
                that.setState({
                    fromSquare: object.sourceSquare,
                    toSquare: object.targetSquare,
                    piece: object.piece,
                    promotion: true
                })
                that.showChoosingModal(0)
                return
            }
            that.hideChoosingModal()
            var id = window.location.pathname.split('/')
            socket.emit('moved', {
                UUID: id[1],
                username: window.localStorage.getItem('username'),
                token: window.localStorage.getItem('token'),
                refreshToken: window.localStorage.getItem('refreshToken'),
                moveObject: object,
                promotion: false,
                promoteTo: null
            })
        }else{
            that.hideChoosingModal()
        }

    }

    highlightMoves(square){
        if(this.state.spectator){
            return
        }
        if(this.state.color == 'white'){
            if(chess.turn() == 'b'){
                return
            }
        }else{
            if(chess.turn() == 'w'){
                return
            }
        }
        let moves = chess.moves({
            square: square,
            verbose: true
        })

        if(moves.length === 0){
            return
        }

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to)
        }

        that.highlightMovesNext(squaresToHighlight)
    }

    highlightMovesNext(squaresToHighlight){
        for(var i = 0; i < squaresToHighlight.length; i++){
            var square = document.querySelectorAll(`[data-squareid='${squaresToHighlight[i]}']`)
            if(square[0]){
                if(square[0].children[0].children[0]){
                    if(square[0].children[0].children[0].hasAttribute("data-testid")){
                        if(square[0].children[0].children[0].getAttribute("data-testid") == 'column-a' || square[0].children[0].children[0].getAttribute("data-testid") == 'column-b' || square[0].children[0].children[0].getAttribute("data-testid") == 'column-c' || square[0].children[0].children[0].getAttribute("data-testid") == 'column-d' || square[0].children[0].children[0].getAttribute("data-testid") == 'column-e' || square[0].children[0].children[0].getAttribute("data-testid") == 'column-f' || square[0].children[0].children[0].getAttribute("data-testid") == 'column-g' || square[0].children[0].children[0].getAttribute("data-testid") == 'column-h'){
                            square[0].classList.add('possible-move')
                        }else{
                            square[0].classList.add('take')
                        }
                    }else{
                        square[0].classList.add('possible-move')
                    }
                }else{
                    square[0].classList.add('possible-move')
                }
            }
        }
    }

    removeHighlightSquare(){
        var els = document.getElementsByClassName('possible-move')
        var take = document.getElementsByClassName('take')
        for(var i = 0; i < take.length; i){
            take[i].classList.remove('take')
        }
        for(var i = 0; i < els.length; i){
            els[i].classList.remove('possible-move')
        }
    }

    showLastMove(lastMoves){
        var sourceSquare = document.querySelectorAll(`[data-squareid='${lastMoves[0]}']`)
        var targetSquare = document.querySelectorAll(`[data-squareid='${lastMoves[1]}']`)
        if(sourceSquare[0] && targetSquare[0]){
            sourceSquare[0].classList.add('lastMove')
            targetSquare[0].classList.add('lastMove')
        }
    }

    componentDidMount(){
        var id = window.location.pathname.split("/")
        if(id[1]){
            socket.emit('join', (id[1]))
            socket.emit('getGameInfo', (id[1]))
        }

        socket.on('gameState', (props) => {
            chess = new Chess(props.game.fens[props.game.fens.length-1])
            if(props.game.players.black.username == window.localStorage.getItem('username')){
                this.setState({
                    fen: props.game.fens[props.game.fens.length-1],
                    color: 'black',
                    finished: props.game.finished,
                    playerWhite: props.game.players.white.username,
                    playerBlack: props.game.players.black.username
                })
            }else if(props.game.players.white.username == window.localStorage.getItem('username')){
                this.setState({
                    fen: props.game.fens[props.game.fens.length-1],
                    color: 'white',
                    finished: props.game.finished,
                    playerWhite: props.game.players.black.username,
                    playerBlack: props.game.players.white.username
                })
            }else{
                this.setState({
                    fen: props.game.fens[props.game.fens.length-1],
                    color: 'white',
                    spectator: true,
                    finished: props.game.finished,
                    playerWhite: props.game.players.black.username,
                    playerBlack: props.game.players.white.username
                })
            }

            if(props.game.pgn.length > 0){
                var lastMove = props.game.pgn[props.game.pgn.length - 1]
                lastMove = lastMove.split('-')
                that.showLastMove(lastMove)
            }

            var inCheck = chess.in_check()
            if(inCheck){
                if(chess.turn() == 'b'){
                    var el = document.getElementsByClassName('bk')
                    if(el){
                        el[0].parentNode.parentNode.parentNode.classList.add('inCheck')
                    }
                }else{
                    var el = document.getElementsByClassName('wk')
                    if(el){
                        el[0].parentNode.parentNode.parentNode.classList.add('inCheck')
                    }
                }
            }
        })

        socket.on('move', (props) => {
            that.hideChoosingModal()
            that.removeHighlightSquare()
            for(var i = 0; i < document.getElementsByClassName('lastMove').length; i){
                document.getElementsByClassName('lastMove')[i].classList.remove('lastMove')
            }
            var checks = document.getElementsByClassName('inCheck')
            if(checks[0]){
                checks[0].classList.remove('inCheck')
            }
            chess = new Chess(props.game.fens[props.game.fens.length-1])
            this.setState({
                fen: props.game.fens[props.game.fens.length-1],
                fromSquare: '',
                toSquare: '',
                piece: '',
                promotion: false,
                finished: props.game.finished
            })

            if(props.game.pgn.length > 0){
                var lastMove = props.game.pgn[props.game.pgn.length - 1]
                lastMove = lastMove.split('-')
                that.showLastMove(lastMove)
            }

            var inCheck = chess.in_check()
            if(inCheck){
                if(chess.turn() == 'b'){
                    var el = document.getElementsByClassName('bk')
                    if(el){
                        el[0].parentNode.parentNode.parentNode.classList.add('inCheck')
                    }
                }else{
                    var el = document.getElementsByClassName('wk')
                    if(el){
                        el[0].parentNode.parentNode.parentNode.classList.add('inCheck')
                    }
                }
            }
        })

        socket.on('win', () => {
            if(this.state.spectator){
                return
            }
            var el = document.getElementById('gameStatus')
            if(el){
                el.textContent = "You won"
            }
        })

        socket.on('tie', () => {
            if(this.state.spectator){
                return
            }
            var el = document.getElementById('gameStatus')
            if(el){
                el.textContent = "You tied"
            }
        })

        socket.on('lost', () => {
            if(this.state.spectator){
                return
            }
            var el = document.getElementById('gameStatus')
            if(el){
                el.textContent = "You lost"
            }
        })
    }
  
    render(){
        return(
            <div>
                Chess
                <div className="game">
                <div className="chessboard text-right">
                    {this.renderModals(0)}
                    {this.renderModals(1)}
                    {this.state.playerWhite}
                    {this.state.playerBlack}
                    <div id="gameStatus"></div>
                    <Chessboard 
                    position={this.state.fen} 
                    orientation={this.state.color}
                    onDrop={this.move} 
                    onSquareClick={this.showMoves}
                    pieces={{
                        wP: () => (
                            <img
                            className="chess-piece"
                                src={"/img/wp.png"}
                                alt={"wP"}
                            />
                            ),
                        wR: () => (
                            <img
                            className="chess-piece"
                            src={"/img/wr.png"}
                            alt={"wR"}
                            />
                        ),
                        wN: () => (
                            <img
                            className="chess-piece"
                                src={"/img/wn.png"}
                                alt={"wN"}
                            />
                            ),
                            wB: () => (
                            <img
                            className="chess-piece"
                                src={"/img/wb.png"}
                                alt={"wB"}
                            />
                            ),
                            wQ: () => (
                            <img
                            className="chess-piece"
                                src={"/img/wq.png"}
                                alt={"wQ"}
                            />
                            ),
                            wK: () => (
                            <img
                            className="chess-piece wk"
                                src={"/img/wk.png"}
                                alt={"wK"}
                            />
                            ),
                            bP: () => (
                            <img
                            className="chess-piece"
                                src={"/img/bp.png"}
                                alt={"bP"}
                            />
                            ),
                        bR: () => (
                            <img
                            className="chess-piece"
                            src={"/img/br.png"}
                            alt={"bwR"}
                            />
                        ),
                        bN: () => (
                            <img
                            className="chess-piece"
                                src={"/img/bn.png"}
                                alt={"bN"}
                            />
                            ),
                            bB: () => (
                            <img
                            className="chess-piece"
                                src={"/img/bb.png"}
                                alt={"bB"}
                            />
                            ),
                            bQ: () => (
                            <img
                                className="chess-piece"
                                src={"/img/bq.png"}
                                alt={"bQ"}
                            />
                            ),
                            bK: () => (
                            <img
                                className="chess-piece bk"
                                src={"/img/bk.png"}
                                alt={"bK"}
                            />
                            ),
                        }}
                        />
                    </div>
                </div>
            </div>
        ) 
    }
  }
  
  export { Game }
  