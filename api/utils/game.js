var gamesOngoing = []
var fiveMinutesMatchmaking = []
var fiveMinutesPlusThreeSecondsMatchmaking = []

var matchmakingInterval = (time) => {
    setInterval(()=>{
        console.log(fiveMinutesMatchmaking, fiveMinutesPlusThreeSecondsMatchmaking)
    }, time)
}

var matchmake = (minutes, seconds, username, rating) => {
    if(matchmakeSwitcher(minutes, seconds) == '5+0'){
        
    }else{

    }
    console.log(minutes, seconds, username, rating)
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

module.exports = { matchmake }