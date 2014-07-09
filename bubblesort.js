"use strict"

var readline = require('readline');
var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
var askLessThan = function(el1, el2, callback) {
  READER.question(
    el1 + ' ' + el2 + " The two elements are sorted. yes or no?", function(answer) {
    if (answer == "yes") {
      callback(true);
    } else {
      callback(false);
    }      
  });
};


var performSortPass = function(arr, i , madeAnySwaps, callback) {

  if (i < arr.length - 1) {
    askLessThan(arr[i], arr[i+1], function(lessThan) {
      if (lessThan == false) {
        var temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
        madeAnySwaps = true;
      }
      performSortPass(arr, i+1, madeAnySwaps, callback);
    });
  }else{
    callback(madeAnySwaps);
    
  }
  
}

var crazyBubbleSort = function(arr, sortCompletionCallback) {
  
  
  var sortPassCallback = function(madeAnySwaps) {
    if (madeAnySwaps) {
      performSortPass(arr, 0, false, sortPassCallback);
    } else {
      sortCompletionCallback(arr);
    }
  }
  
  sortPassCallback(true);
};

crazyBubbleSort([3, 2, 1, 4], function (arr) { console.log(arr) });
