describe('History Module Test: ', function () {

    beforeEach(function () {
        historyModule.resetHistory();
    });

    it('test should add O win', function () {
        // given
        var oWins = historyModule.getTimesOWon();

        // when
        historyModule.oWon();

        // then
        expect(historyModule.getTimesOWon()).toBe(oWins + 1);
    });

    it('test should add X win', function () {
        // given
        var xWins = historyModule.getTimesXWon();

        // when
        historyModule.xWon();

        // then
        expect(historyModule.getTimesXWon()).toBe(xWins + 1);
    });

    it('test should add draw win', function () {
        // given
        var draws = historyModule.getTimesWasDraw();

        // when
        historyModule.wasDraw();

        // then
        expect(historyModule.getTimesWasDraw()).toBe(draws + 1);
    });
});