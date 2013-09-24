(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  if (!(typeof(require) === "undefined")) {
    _ = require('./underscore.js');
  }

  var Game = Asteroids.Game = function (ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(10)
  };

  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(numAsteroids){
    var asteroids = [];
    var that = this;

    _(numAsteroids).times(function() {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y))
    });

    return asteroids
  }

  Game.prototype.draw = function() {
    var that = this;

    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach(function(asteroid){
      asteroid.draw(that.ctx);
    });
  }

  Game.prototype.move = function() {
    var that = this;
    this.asteroids.forEach(function(asteroid){
      asteroid.move();
    });
  }

  Game.prototype.step = function () {
    this.move();
    this.draw();
  }

  Game.prototype.start = function () {
    that = this;

    setInterval(function() {
      that.step();
    }, 1000/this.FPS);
  }

})(this);