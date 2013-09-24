(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});
  if (!(typeof(require) === "undefined")) {
    _ = require('./underscore.js');
  }

  var Game = Asteroids.Game = function (ctx) {
    this.intervalID = 0;
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(10);
    this.bullets = [];

    this.ship = new Asteroids.Ship([500, 400], [0, 0])
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;

    key('s', function(){ that.ship.power([0,.2]) });
    key('w', function(){ that.ship.power([0,-.2]) });
    key('d', function(){ that.ship.power([.2,0]) });
    key('a', function(){ that.ship.power([-.2,0]) });
    key('space', function(){ that.fireBullet() });
  }

  Game.DIM_X = 1000;
  Game.DIM_Y = 800;
  Game.FPS = 30;

  Game.prototype.checkCollisions = function() {
    var that = this;

    this.asteroids.forEach(function(asteroid) {
      if (asteroid.isCollidedWith(that.ship)) {
        window.alert("The game is over!!");
        that.stop();
      }
    });
  }

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

    that.ctx.drawImage(background, 0, 0);

    this.asteroids.forEach(function(asteroid){
      asteroid.draw(that.ctx);
    });

    this.bullets.forEach(function(bullet){
      bullet.draw(that.ctx);
    });

    this.ship.draw(this.ctx);
  }

  Game.prototype.move = function() {
    var that = this;

    this.asteroids.forEach(function(asteroid){
      asteroid.move();
    });

    this.bullets.forEach(function(bullet){
      bullet.move();
    });

    this.ship.move();

  }

  Game.prototype.step = function () {
    this.move();
    this.draw();
    this.checkCollisions();
    this.removeStragglers();
    this.checkBullets();
  }

  Game.prototype.checkBullets = function () {
    var that = this;
    this.bullets.forEach(function(bullet) {
      bullet.hitAsteroids(that, that.asteroids);
    });
  }

  Game.prototype.removeStragglers = function () {
    var newAsteroidsArray = [];

    this.asteroids.forEach(function(asteroid) {
      if ((0 < asteroid.pos[0]) && (Game.DIM_X > asteroid.pos[0]) && (0 < asteroid.pos[1]) && (Game.DIM_Y > asteroid.pos[1])) {
        newAsteroidsArray.push(asteroid);
      }
    });

    this.asteroids = newAsteroidsArray;

    var newBulletsArray = [];

    this.bullets.forEach(function(bullet) {
      if ((0 < bullet.pos[0]) && (Game.DIM_X > bullet.pos[0]) && (0 < bullet.pos[1]) && (Game.DIM_Y > bullet.pos[1])) {
        newBulletsArray.push(bullet);
      }
    });

    this.bullets = newBulletsArray;

    if (!((0 < this.ship.pos[0]) && (Game.DIM_X > this.ship.pos[0]) && (0 < this.ship.pos[1]) && (Game.DIM_Y > this.ship.pos[1]))) {
      this.ship.pos = [Game.DIM_X / 2, Game.DIM_Y / 2]
      this.ship.vel = [0, 0]
    }
  }

  Game.prototype.start = function () {
    var that = this;

    this.bindKeyHandlers()
    this.intervalID = setInterval(function() {
      that.step();
    }, 10000/this.FPS);
  }

  Game.prototype.stop = function () {
    clearInterval(this.intervalID);
  }

  Game.prototype.fireBullet = function () {
    var new_bullet = this.ship.fireBullet();
    if (typeof new_bullet != 'undefined') {
      this.bullets.push(new_bullet)
    }
  }

  Game.prototype.removeBullet = function(bullet) {
    this.bullets = _.without(this.bullets, bullet)
  }

  Game.prototype.removeAsteroid = function(asteroid) {
    this.asteroids = _.without(this.asteroids, asteroid)
  }

})(this);