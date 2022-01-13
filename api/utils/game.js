var gamesOngoing = []
var fiveMinutesMatchmaking = []
var fiveMinutesPlusThreeSecondsMatchmaking = []
var fiveMinutesMatchmakingAnonymous = []
var fiveMinutesPlusThreeSecondsMatchmakingAnonymous = []

var matchmakingInterval = (time) => {
    setInterval(async ()=>{
        var usersFive = getUsersTogether(fiveMinutesMatchmaking)
        var usersFivePlusThree = getUsersTogether(fiveMinutesPlusThreeSecondsMatchmaking)
        fiveMinutesMatchmaking = []
        fiveMinutesPlusThreeSecondsMatchmaking = []

        var leftFive = await createGames(usersFive, true)
        if(leftFive.length > 0){
            fiveMinutesMatchmaking = fiveMinutesMatchmaking.concat(leftFive)
        }

        var leftFivePlusThree = await createGames(usersFivePlusThree, true)
        if(leftFivePlusThree.length > 0){
            fiveMinutesPlusThreeSecondsMatchmaking = fiveMinutesPlusThreeSecondsMatchmaking.concat(leftFivePlusThree)
        }

        var leftFiveAnonym = await createGames(fiveMinutesMatchmakingAnonymous, false)
        fiveMinutesMatchmakingAnonymous = leftFiveAnonym

        var leftFivePlusThreeAnonym = await createGames(fiveMinutesPlusThreeSecondsMatchmakingAnonymous, false)
        fiveMinutesPlusThreeSecondsMatchmakingAnonymous = leftFivePlusThreeAnonym
    }, time)
}

var createGames = async (arr, registered) => {
    var arrReturned = []
    var i = 0

    if(arr.length < 2){
        return arr
    }

    while(i < arr.length){
        if(arr[i+1]){
            if(arr[i].rating+100 >= arr[i+1].rating){
                var player = getRandomInt(0, 2)
                if(player == 0){
                    await hostGame(arr[i], arr[i+1], registered)
                }else{
                    await hostGame(arr[i+1], arr[i], registered)
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

var addToArray = (time, username, rating, id, anonym) => {
    switch(time){
        case '5+0':
            if(anonym){
                fiveMinutesMatchmakingAnonymous.push({username, rating, id})
            }else{
                fiveMinutesMatchmaking.push({username, rating, id})
            }
            return true
            case '5+3':
            if(anonym){
                fiveMinutesPlusThreeSecondsMatchmakingAnonymous.push({username, rating, id})
            }else{
                fiveMinutesPlusThreeSecondsMatchmaking.push({username, rating, id})
            }
            return true
        default:
            if(anonym){
                fiveMinutesMatchmakingAnonymous.push({username, rating, id})
            }else{
                fiveMinutesMatchmaking.push({username, rating, id})
            }
            return true
    }
}

var hostGame = async (p1, p2, registered) => {
    console.log(p1, p2, registered)
}

var getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

matchmakingInterval(5000)

module.exports = { matchmake, removeById }