"use strict"

var clock = function() {
  var time = new Date();
  var timeStr = parseInt(time.valueOf());
  var addFive = function() {
    timeStr += 5000;
    console.log(new Date(timeStr));
  }

  setInterval(addFive, 5000);

};


var readline = require('readline');
READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft == 0) {
    completionCallback(sum)
  }
  else {
    READER.question("Enter num   ", function (numString1) {
      var num1 = parseInt(numString1)
      sum = sum + num1
      console.log(sum);
      numsLeft -= 1
      addNumbers(sum, numsLeft, completionCallback)
    })
  }
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});


