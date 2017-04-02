var game = (function (_externalBoard) {
    var details = {
        currentPlayer: "O",
        startingPlayer: "O",
        board: null,
        winner: null,
        isGameActive: true,
        isGameStarted: false,

        deactiveGame: function () {
            details.isGameActive = false;
        },

        switchCurrentPlayer: function () {
            if (details.currentPlayer == "O")
                details.currentPlayer = "X";
            else if (details.currentPlayer == "X")
                details.currentPlayer = "O";
        },

        switchStartingPlayer: function () {
            if (details.startingPlayer == "O")
                details.startingPlayer = "X";
            else if (details.startingPlayer == "X")
                details.startingPlayer = "O";
        },

        checkIfFieldIsNotOccupied: function (id) {
            var field = details.board[game.getPositionYById(id)][game.getPositionXById(id)];
            return (field == null);
        },

        checkIfBoardIsComplete: function () {
            var condition;
            for (var i = 0; i < details.board.length; i++) {
                for (var j = 0; j < details.board.length; j++) {
                    condition = (details.board[i][j] != null);
                    if (condition == false) {
                        return false;
                    }
                }
            }
            return true;
        },

        addWinner: function (_historyModule, player) {
            if (details.isGameActive) {
                if (player == "O") {
                    _historyModule.oWon();
                    details.deactiveGame();
                }
                else if (player == "X") {
                    _historyModule.xWon();
                    details.deactiveGame();
                }
                details.winner = player;
            }
        },

        insertSymbolIntoField: function (id) {
            if (details.isGameActive && details.checkIfFieldIsNotOccupied(id)) {
                details.isGameStarted = true;
                details.board[game.getPositionYById(id)][game.getPositionXById(id)] = details.currentPlayer;
                details.switchCurrentPlayer();
            }
        }
    };

    return {
        getWinner: function () {
            return details.winner;
        },
        getBoard: function () {
            return details.board;
        },
        getCurrentPlayer: function () {
            return details.currentPlayer;
        },
        getStartingPlayer: function () {
            return details.startingPlayer;
        },
        getIsGameActive: function () {
            return details.isGameActive;
        },
        getIsGameStarted: function () {
            return details.isGameStarted;
        },
        getPositionYById: function (id) {
            return parseInt((id - 1) / game.getBoard().length);
        },
        getPositionXById: function (id) {
            return id - 1 - game.getBoard().length * game.getPositionYById(id);
        },

        init: function (initBoard) {
            details.board = initBoard;
        },

        move: function (_historyModule, _winnerCheckerModule, id) {
            details.insertSymbolIntoField(id);
            var winner = _winnerCheckerModule.checkForWinner(details.board);
            if (winner != null) {
                details.addWinner(_historyModule, winner);
            }
            else if (details.checkIfBoardIsComplete()) {
                _historyModule.wasDraw();
                details.deactiveGame();
            }
        },

        changePlayerTurn: function () {
            if (!details.isGameStarted) {
                details.switchCurrentPlayer();
            }
        },

        changeStartingPlayer: function () {
            details.switchStartingPlayer();
        },

        resetGame: function () {
            if (details.isGameStarted) {
                details.board = null;
                details.isGameStarted = false;
                details.isGameActive = true;
                details.winner = null;
                details.currentPlayer = details.startingPlayer;
            }
        }
    }
})();