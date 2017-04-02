describe('Game Test: ', function () {
    var initBoard;
    var initPlayer = game.getCurrentPlayer();
    var historyMock;
    var checkerMock;

    beforeEach(function () {
        historyMock = jasmine.createSpyObj('historyMock', ['xWon', 'oWon', 'wasDraw']);
        checkerMock = jasmine.createSpyObj('checkerMock', ['checkForWinner']);
        initBoard = [[null, null, null], [null, null, null], [null, null, null]];
        game.resetGame();
        if (game.getCurrentPlayer() != initPlayer)
            game.changePlayerTurn();
    });

    it("test should insert board into game", function () {
        // given
        var board = initBoard;

        // when
        game.init(board);

        // then
        expect(game.getBoard()).toBe(board);
    });

    it("test should reset game", function () {
        // given
        checkerMock.checkForWinner.and.returnValue(null);
        game.init(initBoard);
        var initPlayer = game.getCurrentPlayer();
        var initIsGameStarted = game.getIsGameStarted();
        game.move(historyMock, checkerMock, 8);

        // when
        game.resetGame();

        // then
        expect(game.getBoard()).toBe(null);
        expect(game.getIsGameStarted()).toBe(initIsGameStarted);
        expect(game.getCurrentPlayer()).toBe(initPlayer);
    });

    it("test should change player turn", function () {
        // given
        game.init(initBoard);
        var initPlayer = game.getCurrentPlayer();

        // when
        game.changePlayerTurn();

        // then
        expect(initPlayer).not.toBe(game.getCurrentPlayer());
    });

    it("test should change starting player from O to X", function () {
        // given
        game.init(initBoard);
        var initPlayer = game.getStartingPlayer();

        // when
        game.changeStartingPlayer();

        // then
        expect(initPlayer).not.toBe(game.getStartingPlayer());
    });

    it("test should change starting player from X to O", function () {
        // given
        game.init(initBoard);
        game.changeStartingPlayer();
        var initPlayer = game.getStartingPlayer();

        // when
        game.changeStartingPlayer();

        // then
        expect(initPlayer).not.toBe(game.getStartingPlayer());
    });

    it("test should insert O in left-upper corner", function () {
        // given
        checkerMock.checkForWinner.and.returnValue(null);
        game.init(initBoard);

        // when
        game.move(historyMock, checkerMock, 1);

        // then
        expect(game.getBoard()[0][0]).toBe("O");
    });

    it("test should insert X in the middle of board", function () {
        // given
        checkerMock.checkForWinner.and.returnValue(null);
        game.init(initBoard);
        game.changePlayerTurn();

        // when
        game.move(historyMock, checkerMock, 5);

        // then
        expect(game.getBoard()[1][1]).toBe("X");
    });

    it("test should insert O in the middle of lower row", function () {
        // given
        checkerMock.checkForWinner.and.returnValue(null);
        game.init(initBoard);

        // when
        game.move(historyMock, checkerMock, 8);

        // then
        expect(game.getBoard()[2][1]).toBe("O");
    });

    it("test should deactivate game for draw game", function () {
        // given
        checkerMock.checkForWinner.and.returnValue(null);
        var board = [["X", "X", "O"], ["O", "O", "X"], ["X", null, "X"]];
        game.init(board);

        // when
        game.move(historyMock, checkerMock, 8);

        // then
        expect(game.getWinner()).toBe(null);
        expect(game.getIsGameActive()).toBe(false);
    });

    it("test should set winner to O after winning move", function () {
        // given
        checkerMock.checkForWinner.and.returnValue(null);
        var board = [["O", "X", "X"], ["O", null, "O"], ["X", "O", "X"]];
        game.init(board);
        checkerMock.checkForWinner.and.returnValue('O');

        // when
        game.move(historyMock, checkerMock, 5);

        // then
        expect(game.getWinner()).toBe("O");
        expect(game.getIsGameActive()).toBe(false);
    });

    it("test should set winner to X after winning move", function () {
        // given
        checkerMock.checkForWinner.and.returnValue(null);
        var board = [["O", "O", "X"], [null, "X", "O"], [null, null, null]];
        game.init(board);
        game.changePlayerTurn();
        checkerMock.checkForWinner.and.returnValue('X');

        // when
        game.move(historyMock, checkerMock, 7);

        // then
        expect(game.getWinner()).toBe("X");
        expect(game.getIsGameActive()).toBe(false);
    });

    it("test should start game after first move", function () {
        // given
        checkerMock.checkForWinner.and.returnValue(null);
        game.init(initBoard);
        var initStatus = game.getIsGameStarted();

        // when
        game.move(historyMock, checkerMock, 1);

        // then
        expect(game.getIsGameStarted()).toBe(true);
    });
});