(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    MovingObject.call(this, pos, vel, Asteroid.COLOR, Asteroid.RADIUS);
  };

  Asteroid.COLOR = "grey";
  Asteroid.RADIUS = 25;

  Asteroid.inherits(MovingObject);

  Asteroid.prototype.randomAsteroid = function(dimX, dimY){
    var randX = Math.random() * dimX
    var randY = Math.random() * dimY

    var dx = Math.random() * MAX_1D_VEL
    var dy = Math.random() * MAX_1D_VEL

    return new Asteroid([randX, randY], [dx, dy])
  }

})(this);