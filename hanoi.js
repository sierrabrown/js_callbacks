
(function(root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});
  var Game = Hanoi.Game = function() {
    console.log ("Towers of Hanoi!");
    this.setUpPiles();
    this.playTurn(this.controlFlow.bind(this));
  };
  
  var readline = require('readline');
  var READER = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  Game.prototype.setUpPiles = function() {
     this.piles = [[4,3,2,1],[],[]];
  }
  
  Game.prototype.displayPiles = function() {
    var piles = this.piles;
    console.log("Pile 0:  " + piles[0]);
    console.log("Pile 1:  " + piles[1]);
    console.log("Pile 2:  " + piles[2]);
  }
  
  Game.prototype.validMove = function(from, to) {
    var piles = this.piles;
    if ((piles[to].length) === 0 || 
    (piles[from][piles[from].length - 1] < piles[to][piles[to].length - 1])) {
      return true;
    } else {
      return false;
    }
  }
  
   Game.prototype.moveDisk = function(from, to) {
    if (this.validMove(from,to)) {
      this.moveDiskBang(from,to);
      return true;
    } else {
      return false;
    }
  }
  
   Game.prototype.moveDiskBang = function(from, to) {
    this.piles[to].push(this.piles[from].pop());
  }
  
   Game.prototype.won = function() {
    return (this.piles[1].length === 4 || this.piles[2].length === 4);
  }
  
   Game.prototype.playTurn = function(callback) {
    this.displayPiles()
    READER.question("From where would you like to take a disc?: ", function(numstring1) {
      READER.question("Where would you like to place the disc?: ", function(numstring2) {
        var fromPeg = parseInt(numstring1);
        var toPeg = parseInt(numstring2);
        callback(fromPeg,toPeg)
      });
    });

  }
  
  Game.prototype.controlFlow = function(fromPeg, toPeg) {
    if (this.moveDisk(fromPeg, toPeg) == false) {
      console.log("Invalid move");
    }
    if (!this.won()) {
      this.playTurn(this.controlFlow.bind(this));
    } else {
      console.log('You won!');
    }
  };
  
  new Game();
  
})(this);

