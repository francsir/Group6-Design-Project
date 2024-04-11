
class GameFormatter {

    // Turn game data from frontend into game for backend
    static encodeGame(game) {
        let result = {}


        return result
    }

    // Turn game data from backend to game for frontend
    static decodeGame(game) {
        let decoded = {
        id: game.id,
        date: game.date,
        moves: game.moves,
        result: (game.result === "WH") ? "White" : (game.result === "BL") ? "Black" : "Draw",
    };

        return decoded
    }

}