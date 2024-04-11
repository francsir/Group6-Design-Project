import axios from "axios";

class GameFormatter {

    static findUser(username) {
        var userid = 0;
        axios.get(`http://localhost:8000/get_user?username=${username}`).then(response => {
            userid = response.data.userid
        })
        return userid
    }

    static findUsername(userid) {
        var username = "";
        axios.get(`http://localhost:8000/get_username?userid=${userid}`).then(response => {
            username = response.data.username
        })
        return username
    }

    // Turn game data from frontend into game for backend
    static encodeGame(game, userid) {
        let opponent = this.findUser(game.opponent)
        let moveslist = JSON.parse(game.moves);
        var whiteid, blackid;
        if (game.color === "W") {
            whiteid = userid;
            blackid = opponent;
        } else {
            whiteid = opponent;
            blackid = userid;
        }
        let victorcolor = (game.color === "W") ? ((game.gameResult === "W") ? "White" : "Black") : ((game.gameResult === "W") ? "Black" : "White")

        let result = {
            name: game.name,
            daate: game.gameDate,
            white: whiteid,
            black: blackid,
            moves: JSON.stringify(moveslist),
            victor: victorcolor,
        };
        return result
    }

    // Turn game data from backend to game for frontend
    static decodeGame(game, userid) {
        let isWhite = (game.white === userid);
        let opponent = this.findUsername((isWhite) ? game.black : game.white);
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

        return decoded
    }

}