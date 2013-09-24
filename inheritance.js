(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Function.prototype.inherits = function(parentClass) {
    function Surrogate() {};

    Surrogate.prototype = parentClass.prototype;

    this.prototype = new Surrogate();
  }

})(this);