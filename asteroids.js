(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR);
  };

  Asteroid.COLOR = "red";
  Asteroid.RADIUS = 25;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var randX = Math.random() * dimX
    var randY = Math.random() * dimY

    var max = Asteroids.MovingObject.MAX_1D_VEL
    var min = -Asteroids.MovingObject.MAX_1D_VEL
    var dx = Math.random() * (max - min) + min
    var dy = Math.random() * (max - min) + min

    return new Asteroid([randX, randY], [dx, dy])
  }

})(this);