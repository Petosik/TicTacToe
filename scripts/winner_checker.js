var winner_checker = (function () {
    var details = {
        isGameWon: false,
        isGameActive: true,
        winner: "N",
        checkLine: function (_array) {
            var condition;
            for (var i = 0; i < _array.length; i++) {
                condition = (_array[0] == _array[i] && _array[i] != "N");
                if (!condition) {
                    return false;
                }
            }
            return true;
        }
    };
    return {
        resetChecker: function () {
            details.isGameWon = false;
            details.winner = "N";
            details.isGameActive = true;
        },
        checkForWinner: function (array) {
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
            if ((array[1][1] != "N") && ((array[0][0] == array[1][1] && array[1][1] == array[2][2])
                || (array[2][0] == array[1][1] && array[1][1] == array[0][2]))) {
                details.winner = array[1][1];
                details.isGameWon = true;
            }

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