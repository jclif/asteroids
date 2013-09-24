(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, vel, radius, color) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
  };

  MovingObject.MAX_1D_VEL = .5

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0]
    this.pos[1] += this.vel[1]

  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var xSquared = Math.pow((this.pos[0] - otherObject.pos[0]), 2);
    var ySquared = Math.pow((this.pos[1] - otherObject.pos[1]), 2);

    var dist = Math.sqrt(xSquared + ySquared);

    return dist <= this.radius + otherObject.radius;
  }
})(this);