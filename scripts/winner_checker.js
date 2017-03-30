var winner_checker = (function () {
    var details = {
        isGameWon: false,
        isGameActive: true,
        winner: null,
        checkLine: function (_array) {
            var condition;
            for (var i = 0; i < _array.length; i++) {
                condition = (_array[0] == _array[i] && _array[i] != null);
                if (!condition) {
                    return false;
                }
            }
            return true;
        },

        checkBoard: function (array) {
            // poziomo
            for (var i = 0; i < array.length; i++) {
                if (details.checkLine(array[i])) {
                    details.winner = array[i][0];
                    details.isGameWon = true;
                }
            }
            // pionowo
            for (var i = 0; i < array.length; i++) {
                var tempArray = new Array();
                for (var j = 0; j < array.length; j++) {
                    tempArray.push(array[j][i]);
                }
                if (details.checkLine(tempArray)) {
                    details.winner = array[0][i];
                    details.isGameWon = true;
                }
            }
            // na skos
            var tempArrayUpLeft = new Array();
            var tempArrayUpRight = new Array();
            for (var i = 0; i < array.length; i++) {
                tempArrayUpLeft.push(array[i][i]);
                tempArrayUpRight.push(array[array.length - 1 - i][i]);
            }
            if (details.checkLine(tempArrayUpLeft)) {
                details.winner = array[0][0];
                details.isGameWon = true;
            }
            else if (details.checkLine(tempArrayUpRight)) {
                details.winner = array[array.length - 1][0];
                details.isGameWon = true;
            }
        },
    };
    return {
        resetChecker: function () {
            details.isGameWon = false;
            details.winner = null;
            details.isGameActive = true;
        },

        checkForWinner: function (board) {
            details.checkBoard(board);
            if (details.isGameWon && details.isGameActive) {
                alert("WYGRYWA " + details.winner);
                details.isGameActive = false;
                return details.winner;
            }
            else {
                return null;
            }
        }
    }
})();