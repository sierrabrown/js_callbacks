// var Board = require('./ttt_board');

(function(root) {
  var ticTacToe = root.ticTacToe = (ticTacToe || {});
  
  this.readline = require('readline');
  this.READER = this.readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  ticTacToe.game = function() {
    this.setBoard();
    console.log("Tic Tac Toe!")
    var currentPlayer = p1
    this.playTurn(currentPlayer)
  }
  
  ticTacToe.playTurn = function(player) {
    this.displayBoard();
    console.log(player.name + "'s turn!")
    this.getMove(player, ticTacToe.controlFlow.bind(this));
  }
  
  ticTacToe.getMove = function(player, callback) {
    READER.question("Enter the x coordinate you want to play: ", function(numstring1) {
      READER.question("Enter the y coordinate you want to play: ", function(numstring2) {
        var moveX = parseInt(numstring1);
        var moveY = parseInt(numstring2);
        callback(moveY, moveX, player)
      });
    });
  }
  
  ticTacToe.controlFlow = function(moveY, moveX, player) {
    console.log("control flow")
    console.log(player)
    if (!ticTacToe.setMark(moveY, moveX, player)) {
      console.log("Invalid move!")
    }
    var player = player
    if (!this.won()) {
      if (player == p1) {
        player = p2
      }else{
        player = p1
      }
      this.playTurn(player);
    } else {
      console.log("You won!")
    }
  }
  
  ticTacToe.setBoard = function() {
    this.board = [["_","_","_"],["_","_","_"],["_","_","_"]]
  }
  
  ticTacToe.displayBoard = function() {
    var board = this.board;
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  }
  
  ticTacToe.won = function() {
    options = []
    var board = this.board
    for (var i = 0; i < 3; i++) {
      options.push(this.board[i])
      var column = []
      for (var j = 0; j < 3; j ++ ) {
        column.push(this.board[j][i])
      }
      options.push(column)
    }
    options.push([board[0][0],board[1][1],board[2][2]])
    options.push([board[0][2],board[1][1],board[2][0]])
    
    for (var i = 0; i < options.length; i++) {
      if ((options[i].indexOf("_") === -1)
      && (((options[i]).indexOf("X") === -1)
      || (options[i].indexOf("O") === -1))) {
        return true;
      }
    }
    return false;
  }

  ticTacToe.setMark = function(moveY, moveX, player) {
    if (this.validMove(moveY, moveX)) {
      this.board[moveY][moveX] = player.mark;
      return true
    }else{
      return false
    }
  }
  
  
  ticTacToe.validMove = function(moveY, moveX) {
    console.log(this.board)
    if (this.board[moveY][moveX] == "_") {
      return true;
    }
  };
  
  var p1 = ticTacToe.player1 = {}
  p1.name = "J";
  p1.mark = "O";
  
  var p2 = ticTacToe.player2 = {}
  p2.name = "S";
  p2.mark = "X";
  
  ticTacToe.game()
  
  
})(this);