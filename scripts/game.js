var game = (function () {
    var details = {
        currentPlayer: "O",
        board: [["N", "N", "N"], ["N", "N", "N"], ["N", "N", "N"]],
        isGameActive: true,
        isGameStarted: false,
        winsOfX: 0,
        winsOfO: 0
    };
    return {
        deactiveGame: function () {
            details.isGameActive = false;
        },

        getWonsOfX: function () {
            return details.winsOfX;
        },
        getWonsOfO: function () {
            return details.winsOfO;
        },

        switchCurrentPlayer: function () {
            if (details.currentPlayer == "O")
                details.currentPlayer = "X";
            else if (details.currentPlayer == "X")
                details.currentPlayer = "O";
        },

        insertSymbolIntoDiv: function (id) {
            if (details.isGameActive) {
                var userTurnCell = document.getElementById("userTurn"),
                    cell = document.getElementById("cell" + id),
                    intId = parseInt(id),
                    positionY = parseInt((id - 1) / 3),
                    positionX = id - 1 - 3 * positionY,
                    field = details.board[positionY][positionX];
                if (field == "N") {
                    details.isGameStarted = true;
                    details.board[positionY][positionX] = details.currentPlayer;
                    var symbolCell = '<div class="symbol">' + details.currentPlayer + '</div>';
                    game.switchCurrentPlayer();
                    userTurnCell.innerHTML = details.currentPlayer;
                    cell.innerHTML = symbolCell;
                }
            }
            return details.board
        },

        resetGame: function () {
            for (var i = 1; i < 10; i++) {
                document.getElementById("cell" + i).innerHTML = "";
            }
            details.board = [["N", "N", "N"], ["N", "N", "N"], ["N", "N", "N"]];
            details.isGameStarted = false;
            details.isGameActive = true;
            document.getElementById("userTurn").innerHTML = details.currentPlayer;
        },

        changePlayerTurn: function () {
            if (!details.isGameStarted) {
                game.switchCurrentPlayer();
                document.getElementById("userTurn").innerHTML = details.currentPlayer;
            }
        },

        addWinner: function (player) {
            if (details.isGameActive) {
                if (player == "O") {
                    details.winsOfO += 1;
                    game.deactiveGame();
                    document.getElementById("winsOfO").innerHTML = details.winsOfO;
                }
                else if (player == "X") {
                    details.winsOfX += 1;
                    game.deactiveGame();
                    document.getElementById("winsOfX").innerHTML = details.winsOfX;
                }
            }
        }
    }
})();