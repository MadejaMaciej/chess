const { Game } = require('../models/games') 
const _ = require('lodash')


var gamesOngoing = []
var fiveMinutesMatchmaking = []
var fiveMinutesPlusThreeSecondsMatchmaking = []
var fiveMinutesMatchmakingAnonymous = []
var fiveMinutesPlusThreeSecondsMatchmakingAnonymous = []
var io

var gameUtils = (ios) => {
    io = ios
}

var matchmakingInterval = (time) => {
    setInterval(async ()=>{
        var usersFive = getUsersTogether(fiveMinutesMatchmaking)
        var usersFivePlusThree = getUsersTogether(fiveMinutesPlusThreeSecondsMatchmaking)
        fiveMinutesMatchmaking = []
        fiveMinutesPlusThreeSecondsMatchmaking = []

        var leftFive = await createGames(usersFive, 'classic', '5+0', 1000*60*5)
        if(leftFive.length > 0){
            fiveMinutesMatchmaking = fiveMinutesMatchmaking.concat(leftFive)
        }

        var leftFivePlusThree = await createGames(usersFivePlusThree, 'classic', '5+3', 1000*60*5)
        if(leftFivePlusThree.length > 0){
            fiveMinutesPlusThreeSecondsMatchmaking = fiveMinutesPlusThreeSecondsMatchmaking.concat(leftFivePlusThree)
        }

        var leftFiveAnonym = await createGames(fiveMinutesMatchmakingAnonymous, 'classic', '5+0', 1000*60*5)
        fiveMinutesMatchmakingAnonymous = leftFiveAnonym

        var leftFivePlusThreeAnonym = await createGames(fiveMinutesPlusThreeSecondsMatchmakingAnonymous, 'classic', '5+3', 1000*60*5)
        fiveMinutesPlusThreeSecondsMatchmakingAnonymous = leftFivePlusThreeAnonym
    }, time)
}

var createGames = async (arr, type, time, timeMs) => {
    var arrReturned = []
    var i = 0

    if(arr.length < 2){
        return arr
    }

    while(i < arr.length){
        if(arr[i+1]){
            if(arr[i].rating+100 >= arr[i+1].rating && arr[i].rating-100 <= arr[i+1].rating){
                var player = getRandomInt(0, 2)
                if(player == 0){
                    await hostGame(arr[i], arr[i+1], type, time, timeMs)
                }else{
                    await hostGame(arr[i+1], arr[i], type, time, timeMs)
                }
                i += 2
            }else {
                arrReturned.push(arr[i])
                i++
            }
        }else{
            arrReturned.push(arr[i])
            i++ 
        }
    }
    return arrReturned
} 

var getUsersTogether = (arr) => {
    arr.sort((a, b)=> {
        return a['rating'] > b['rating'] ? 1: a['rating'] < b['rating'] ? -1: 0
    })
    return arr
}

var matchmake = (minutes, seconds, username, rating, id, anonym) => {
    var time = matchmakeSwitcher(minutes, seconds)
    return addToArray(time, username, rating, id, anonym)
}

var matchmakeSwitcher = (minutes, seconds) => {
    switch(minutes){
        case 5:
            switch(seconds){
                case 0:
                    return '5+0'
                case 3:
                    return '5+3' 
            }
        default:
            return '5+0'
    }
}

var removeById = (id) => {
    var longestArr = [fiveMinutesMatchmaking.length,fiveMinutesMatchmakingAnonymous.length,fiveMinutesPlusThreeSecondsMatchmaking.length,fiveMinutesPlusThreeSecondsMatchmakingAnonymous.length]
    var max
    for(let i = 0; i<longestArr.length; i++){
        if(i == 0){
            max = longestArr[i]
        }

        if(max < longestArr[i]){
            max = longestArr[i]
        }
    }

    var fm = fiveMinutesMatchmaking
    var fma = fiveMinutesMatchmakingAnonymous
    var fmpt = fiveMinutesPlusThreeSecondsMatchmaking
    var fmpta = fiveMinutesPlusThreeSecondsMatchmakingAnonymous

    var fmChanges = 0
    var fmaChanges = 0
    var fmptChanges = 0
    var fmptaChanges = 0

    for(let i = 0; i < max; i++){
        if(fiveMinutesMatchmaking.length > i){
            if(fiveMinutesMatchmaking[i].id == id){
                fm.splice(i - fmChanges, 1)
                fmChanges++
            }
        }

        
        if(fiveMinutesMatchmakingAnonymous.length > i){
            if(fiveMinutesMatchmakingAnonymous[i].id == id){
                fma.splice(i - fmaChanges, 1)
                fmaChanges++
            }
        }

        if(fiveMinutesPlusThreeSecondsMatchmaking.length > i){
            if(fiveMinutesPlusThreeSecondsMatchmaking[i].id == id){
                fmpt.splice(i - fmptChanges, 1)
                fmptChanges++
            }
        }

        if(fiveMinutesPlusThreeSecondsMatchmakingAnonymous.length > i){
            if(fiveMinutesPlusThreeSecondsMatchmakingAnonymous[i].id == id){
                fmpta.splice(i - fmptaChanges, 1)
                fmptaChanges++
            }
        }
    }

    fiveMinutesMatchmaking = fm
    fiveMinutesMatchmakingAnonymous = fma
    fiveMinutesPlusThreeSecondsMatchmaking = fmpt
    fiveMinutesPlusThreeSecondsMatchmakingAnonymous = fmpta
}

var checkIfInArray = (id, arr) => {
    for(let i = 0; i < arr.length; i++){
        if(id == arr[i].id){
            arr.splice(i, 1)
            return true
        }
    }

    return false
}

var addToArray = (time, username, rating, id, anonym) => {
    switch(time){
        case '5+0':
            if(anonym){
                if(checkIfInArray(id, fiveMinutesMatchmakingAnonymous)){
                    return false
                }
                fiveMinutesMatchmakingAnonymous.push({username, rating, id})
            }else{
                if(checkIfInArray(id, fiveMinutesMatchmaking)){
                    return false
                }
                fiveMinutesMatchmaking.push({username, rating, id})
            }
            return true
            case '5+3':
            if(anonym){
                if(checkIfInArray(id, fiveMinutesPlusThreeSecondsMatchmakingAnonymous)){
                    return false
                }
                fiveMinutesPlusThreeSecondsMatchmakingAnonymous.push({username, rating, id})
            }else{
                if(checkIfInArray(id, fiveMinutesPlusThreeSecondsMatchmaking)){
                    return false
                }
                fiveMinutesPlusThreeSecondsMatchmaking.push({username, rating, id})
            }
            return true
        default:
            if(anonym){
                fiveMinutesMatchmakingAnonymous.push({username, rating, id})
            }else{
                if(checkIfInArray(id, fiveMinutesMatchmaking)){
                    return false
                }
                fiveMinutesMatchmaking.push({username, rating, id})
            }
            return true
    }
}

var hostGame = async (p1, p2, type, time, timeMs ) => {
    var date = new Date()
    var day = date.getDate()
    if(day < 10){
        day = '0'+day
    }
    var sendingDate = day + "-" +date.getMonth()+1 + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
    var game = undefined
    var id
    do{
        id = makeId(12)
        game = await Game.findOne({UUID: id})
    }while(game)
    var game = new Game(_.pick({
        UUID: id,
        pgn: [], 
        fens: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'], 
        players: {
            white: {
                username: p1.username,
                rating: p1.rating,
                time: timeMs
            },
            black: {
                username: p2.username,
                rating: p2.rating,
                time: timeMs
            }
        }, 
        gameSettings: {
            type: type,
            time: time
        }, 
        logs: [`${sendingDate}: Game has been created. White: ${p1.username}. Black: ${p2.username}.`],
        finished: false,
        username1: p1.username,
        username2: p2.username,
        winner: ''
    }, ['UUID', 'pgn', 'fens', 'players', 'gameSettings', 'logs', 'finished', 'username1', 'username2', 'winner']))
    await game.save()
    io.to(p1.id).emit('gameCreated', ({UUID: game.UUID}))
    io.to(p2.id).emit('gameCreated', ({UUID: game.UUID}))
}

var makeId = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

matchmakingInterval(5000)

module.exports = { matchmake, removeById, gameUtils }