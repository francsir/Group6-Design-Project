import axios from "axios";

function findUser(username) {
    var userid = 0;
    axios.get(`http://localhost:8000/get_user?username=${username}`).then(response => {
        console.log(response)
        userid = response.data.userid
    })
    return userid
}

function findUsername(userid) {
    var username = "";
    axios.get(`http://localhost:8000/get_username?userid=${userid}`).then(response => {
        console.log(response)
        username = response.data.username
    })
    return username
}

export function prettyMovelist(moves) {
    try {
        var movedict = {};
        var currturn, wmove, bmove;
        for (let turn = 0; turn < moves.length; turn+=3) {
            wmove = (moves[turn+1] !== null) ? moves[turn+1][0] : '';
            bmove = (moves[turn+2] !== null) ? moves[turn+2][0] : '';
            currturn = [wmove, bmove];
            if (wmove !== '' && bmove !== '') {
                movedict[turn/3] = currturn 
            } else {
                break;
            }
        }
        return movedict;
    } catch {
        return moves
    }

}

// Turn game data from frontend into game for backend
export function encodeGame(game, userid) {
    let opponent = findUser(game.opponent);
    var whiteid = 0, blackid = 0;
    if (game.color === "W") {
        whiteid = Number(userid);
        blackid = opponent;
    } else {
        whiteid = opponent;
        blackid = Number(userid);
    }
    let victorcolor = (game.color === "W") ? ((game.gameResult === "W") ? "White" : "Black") : ((game.gameResult === "W") ? "Black" : "White")
    
    let result = {
        name: game.gameName,
        date: game.gameDate,
        white: whiteid,
        black: blackid,
        moves: game.moves,
        victor: victorcolor,
    };
    console.log(result);
    return result
}

// Turn game data from backend to game for frontend
export function decodeGame(game, userid) {
    let isWhite = (game.white === userid);
    let opponent = findUsername((isWhite) ? game.black : game.white);
    let outcome = game.victor;
    let color = isWhite ? "White" : "Black";
    let decoded = {
        id: game.id,
        name: game.name,
        date: game.date,
        moves: game.moves,
        color: color,
        result: outcome === "Draw" ? "Draw" : (outcome === color) ? "Win" : "Loss",
        opponent: opponent,
    };
    console.log(decoded);
    return decoded
}
