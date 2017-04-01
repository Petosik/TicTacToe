describe('Winner Checker Test: ', function () {
    it('test should return null for empty board', function () {
        // given
        var board = [[null, null, null], [null, null, null], [null, null, null]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe(null);
    });

    it('test should return null for draw', function () {
        // given
        var board = [["X", "X", "O"], ["O", "O", "X"], ["X", "O", "X"]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe(null);
    });

    it('test should return O for vertical left line', function () {
        // given
        var board = [["O", null, null], ["O", "X", null], ["O", null, "X"]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe("O");
    });

    it('test should return X for vertical middle line', function () {
        // given
        var board = [["O", "X", null], ["O", "X", null], [null, "X", null]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe("X");
    });

    it('test should return O for vertical right line', function () {
        // given
        var board = [[null, null, "O"], ["X", null, "O"], ["X", null, "O"]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe("O");
    });

    it('test should return X for horizontal upper line', function () {
        // given
        var board = [["X", "X", "X"], [null, "O", "O"], ["O", "O", "X"]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe("X");
    });

    it('test should return O for horizontal middle line', function () {
        // given
        var board = [["O", "X", "X"], ["O", "O", "O"], ["X", "O", "X"]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe("O");
    });

    it('test should return X for horizontal lower line', function () {
        // given
        var board = [["O", "O", "X"], ["X", "O", "O"], ["X", "X", "X"]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe("X");
    });

    it('test should return O for upper-left diagonal line', function () {
        // given
        var board = [["O", null, "X"], [null, "O", "X"], [null, null, "O"]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe("O");
    });

    it('test should return X for upper-right diagonal line', function () {
        // given
        var board = [["O", "O", "X"], [null, "X", "O"], ["X", null, null]];

        // when
        var winner = winner_checker.checkForWinner(board);

        // then
        expect(winner).toBe("X");
    });
});