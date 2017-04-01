var winner_checker = (function () {
    var details = {
        isGameWon: false,
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
                    details.isGameWon = true;
                    return array[i][0];
                }
            }
            // pionowo
            for (var i = 0; i < array.length; i++) {
                var tempArray = new Array();
                for (var j = 0; j < array.length; j++) {
                    tempArray.push(array[j][i]);
                }
                if (details.checkLine(tempArray)) {
                    details.isGameWon = true;
                    return array[0][i];

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
                details.isGameWon = true;
                return array[0][0];
            }
            else if (details.checkLine(tempArrayUpRight)) {
                details.isGameWon = true;
                return array[array.length - 1][0];

            }
        },

        resetChecker: function () {
            details.isGameWon = false;
        },
    };
    return {
        checkForWinner: function (board) {
            var winner = details.checkBoard(board);
            if (details.isGameWon) {
                details.resetChecker();
                return winner;
            }
            else {
                return null;
            }
        }
    }
})();