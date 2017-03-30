var game = (function () {
    var details = {
        currentPlayer: "O",
        isGameActive: true,
        board: null,
        isGameStarted: false,
        getPositionYById: function (id) {
            return parseInt((id - 1) / details.board.length);
        },
        getPositionXById: function (id) {
            return id - 1 - details.board.length * details.getPositionYById(id);
        },
        deactiveGame: function () {
            details.isGameActive = false;
        },
        switchCurrentPlayer: function () {
            if (details.currentPlayer == "O")
                details.currentPlayer = "X";
            else if (details.currentPlayer == "X")
                details.currentPlayer = "O";
        },
        updatePlayerTurn: function () {
            details.switchCurrentPlayer();
            document.getElementById("userTurn").innerHTML = details.currentPlayer;
        },
        checkIfFieldIsNotOccupied: function (id) {
            field = details.board[details.getPositionYById(id)][details.getPositionXById(id)];
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
        addWinner: function (player) {
            if (details.isGameActive) {
                if (player == "O") {
                    historyModule.oWon();
                    details.deactiveGame();
                    document.getElementById("winsOfO").innerHTML = historyModule.getTimesOWon();
                }
                else if (player == "X") {
                    historyModule.xWon();
                    details.deactiveGame();
                    document.getElementById("winsOfX").innerHTML = historyModule.getTimesXWon();
                }
            }
        },
        getBoardFromDocument: function () {
            var fields = document.getElementsByClassName("field"),
                boardSize = Math.sqrt(fields.length), // here is place where we can check if X and Y size is the same
                fieldsBoard = new Array(boardSize);
            for (var i = 0; i < boardSize; i++) {
                fieldsBoard[i] = new Array(boardSize);
                for (j = 0; j < boardSize; j++) {
                    fieldsBoard[i][j] = null;
                }
            }
            return fieldsBoard;
        },
        insertSymbolIntoField: function (id) {
            if (!details.isGameStarted) {
                details.board = details.getBoardFromDocument();
            }
            if (details.isGameActive && details.checkIfFieldIsNotOccupied(id)) {
                details.isGameStarted = true;
                details.board[details.getPositionYById(id)][details.getPositionXById(id)] = details.currentPlayer;
                var symbolCell = '<div class="symbol">' + details.currentPlayer + '</div>',
                    cell = document.getElementById("cell" + id);
                details.updatePlayerTurn();
                cell.innerHTML = symbolCell;
            }
        }
    };
    return {
        changePlayerTurn: function () {
            if (!details.isGameStarted) {
                details.updatePlayerTurn();
            }
        },

        resetGame: function () {
            for (var i = 1; i < Math.pow(details.board.length) + 1; i++) {
                document.getElementById("cell" + i).innerHTML = "";
            }
            details.board = null;
            details.isGameStarted = false;
            details.isGameActive = true;
            document.getElementById("userTurn").innerHTML = details.currentPlayer;
            winner_checker.resetChecker();
        },

        perform: function (id) {
            details.insertSymbolIntoField(id);
            var winner = winner_checker.checkForWinner(details.board);
            if (winner != null) {
                details.addWinner(winner);
            }
            else if (details.checkIfBoardIsComplete()) {
                historyModule.wasDraw();
                details.deactiveGame();
                alert("REMIS");
                document.getElementById("draws").innerHTML = historyModule.getTimesWasDraw();
            }
        }
    }
})();