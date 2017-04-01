var historyModule = (function () {
    var _xWins = 0;
    var _oWins = 0;
    var _draws = 0;

    return {
        xWon: function () {
            _xWins++;
        },
        oWon: function () {
            _oWins++;
        },
        wasDraw: function () {
            _draws++;
        },
        getTimesXWon: function () {
            return _xWins;
        },
        getTimesOWon: function () {
            return _oWins;
        },
        getTimesWasDraw: function () {
            return _draws;
        },
        resetHistory: function () {
            _xWins = 0;
            _oWins = 0;
            _draws = 0;
        }



    }
})();
