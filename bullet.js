(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, vel) {
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  };

  Bullet.COLOR = "green";
  Bullet.RADIUS = 5;

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function(game, asteroids) {
    var that = this;
    asteroids.forEach(function(asteroid) {
      if (that.isCollidedWith(asteroid)) {
        game.removeAsteroid(asteroid);
        game.removeBullet(that);
      }
    });
  }

})(this);