### Omer Boucris ###
## ID: 314969817 ##


def board_helper(board) -> dict:
    return {
        "id": str(board["_id"]),
        "name": board["name"],
        "cities": list(board["cities"])
    }

def boards_helper(boards) -> list:
    return [board_helper(board) for board in boards]