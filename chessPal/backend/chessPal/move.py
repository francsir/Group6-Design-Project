import chess
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.5',
    # 'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://chesshub.com/analysis',
    'Content-Type': 'application/json;charset=utf-8',
    'Origin': 'https://chesshub.com',
    'Sec-Fetch-Dest': 'empty',
}


def create_board_from_uci_moves(moves) -> chess.Board:
    board = chess.Board()
    try:
        for move in moves:
            board.push_uci(move)
    except Exception as e:
        print(e)
    return board


def get_next_move_from_board(board):
    try:
        fen = board.fen()
        response = requests.post('https://chesshub.com/api/v1/fens.json', headers=headers, json={"fen": fen})
        data = response.json()['analysis']
        move = data['move']
        return move['from'], move['to'], data['score'], data['sequence']
    except Exception as e:
        print(e)


if __name__ == '__main__':
    board = create_board_from_uci_moves(['e2e4', 'e7e5', 'g1f3', 'b8c6'])
    print(get_next_move_from_board(board))

