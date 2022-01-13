var gamesOngoing = []
var fiveMinutesMatchmaking = []
var fiveMinutesPlusThreeSecondsMatchmaking = []
var fiveMinutesMatchmakingAnonymous = []
var fiveMinutesPlusThreeSecondsMatchmakingAnonymous = []

var matchmakingInterval = (time) => {
    setInterval(()=>{
        console.log(fiveMinutesMatchmaking, fiveMinutesMatchmakingAnonymous, fiveMinutesPlusThreeSecondsMatchmaking, fiveMinutesPlusThreeSecondsMatchmakingAnonymous)
    }, time)
}

var matchmake = (minutes, seconds, username, rating, id, anonym) => {
    var time = matchmakeSwitcher(minutes, seconds)
    addToArray(time, username, rating, id, anonym)
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

var addToArray = (time, username, rating, id, anonym) => {
    switch(time){
        case '5+0':
            if(anonym){
                fiveMinutesMatchmakingAnonymous.push({username, rating, id})
            }else{
                fiveMinutesMatchmaking.push({username, rating, id})
            }
            return
            case '5+3':
            if(anonym){
                fiveMinutesPlusThreeSecondsMatchmakingAnonymous.push({username, rating, id})
            }else{
                fiveMinutesPlusThreeSecondsMatchmaking.push({username, rating, id})
            }
            return
        default:
            if(anonym){
                fiveMinutesMatchmakingAnonymous.push({username, rating, id})
            }else{
                fiveMinutesMatchmaking.push({username, rating, id})
            }
            return
    }
}

class chessLogic {
    UUID
    whiteName
    blackName
    whiteTime
    blackTime
    whiteRating
    blackRating
    whiteTitle
    blackTitle
    PGN
    FENS = []
    logs
    plusTime
    constructor(UUID, whiteName, blackName, times, whiteRating, blackRating, whiteTitle, blackTitle, fen, plusTime){
        let [month, date, year]    = new Date().toLocaleDateString("en-US").split("/")
        let [hour, minute, second] = new Date().toLocaleTimeString("en-US").split(/:| /)
        this.UUID = UUID
        this.whiteName = whiteName
        this.blackName = blackName
        this.whiteTime = times
        this.blackTime = times
        this.whiteRating = whiteRating
        this.blackRating = blackRating
        this.whiteTitle = whiteTitle
        this.blackTitle = blackTitle
        this.PGN = ""
        this.FENS.push(fen)
        this.logs = `${date}-${month}-${year} ${hour}:${minute}:${second}: Player ${whiteName} with rating ${whiteRating} is facing ${blackName} with rating ${blackRating} as white.`
        this.plusTime = plusTime
    }
}

matchmakingInterval(5000)

module.exports = { matchmake, removeById }