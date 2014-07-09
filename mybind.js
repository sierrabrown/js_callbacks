
Function.prototype.myBind = function(obj) {
  var that = this;
  return function() {
    return that.apply(obj, []);
}};

function times(num, fun) {
  for (var i = 0; i < num; i++) {
    fun();
  }
};

var cat = {
  age: 5,

  ageOneYear: function() {
    this.age += 1;
  }
};


console.log(cat.age);
times(10, cat.ageOneYear.myBind(cat));
console.log(cat.age);