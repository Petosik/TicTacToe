var presenter = (function () {
    var details = {
        isResultAnnounced: false,

        getBoardFromDocument: function () {
            var fields = document.getElementsByClassName("field"),
                boardSize = Math.sqrt(fields.length),
                fieldsBoard = new Array(boardSize);
            for (var i = 0; i < boardSize; i++) {
                fieldsBoard[i] = new Array(boardSize);
                for (j = 0; j < boardSize; j++) {
                    fieldsBoard[i][j] = null;
                }
            }
            return fieldsBoard;
        }
    };

    return {

        reset: function (_gameModule) {
			if (_gameModule.getIsGameStarted())
			{
            for (var i = 1; i <= Math.pow(_gameModule.getBoard().length, 2); i++) {
                document.getElementById("cell" + i).innerHTML = "";
            }
			}
            _gameModule.resetGame();
        },

        changeTurn: function (_gameModule) {
            _gameModule.changePlayerTurn();
            document.getElementById("userTurn").innerHTML = _gameModule.getCurrentPlayer();
        },

        insertSymbol: function (_gameModule, _winnerCheckerModule, _historyModule, id) {
            if (_gameModule.getIsGameStarted() == false) {
                _gameModule.init(details.getBoardFromDocument());
                details.isResultAnnounced = false;
            }

            if (_gameModule.getIsGameActive()) {
                _gameModule.move(_historyModule, _winnerCheckerModule, id);
                var posY = _gameModule.getPositionYById(id),
                    posX = _gameModule.getPositionXById(id),
					symbol = _gameModule.getBoard()[posY][posX],
					symbolClass;
					
					if(symbol == "X")
					{
						symbolClass = "cross";
					}
					else if(symbol == "O")
					{
						symbolClass = "circle";
					}
					
                    var symbolCell = '<div class="symbol ' + symbolClass +'"><span>' + symbol + '<span></div>',
                    cell = document.getElementById("cell" + id);
                cell.innerHTML = symbolCell;
            }

            if (!_gameModule.getIsGameActive()) {
                var winner = _gameModule.getWinner();
                if (winner == null) {
                    document.getElementById("draws").innerHTML = _historyModule.getTimesWasDraw();
                    if (!details.isResultAnnounced) {
                        alert("REMIS");
                        details.isResultAnnounced = true;
                    }
                }
                else {
                    if (winner == "O") {
                        document.getElementById("winsOfO").innerHTML = _historyModule.getTimesOWon();
                    }
                    else if (winner == "X") {
                        document.getElementById("winsOfX").innerHTML = _historyModule.getTimesXWon();
                    }
                    if (!details.isResultAnnounced) {
                        alert("WYGRYWA " + _gameModule.getWinner());
                        details.isResultAnnounced = true;
                    }

                }
            }
            document.getElementById("userTurn").innerHTML = _gameModule.getCurrentPlayer();
        }
    }
})();