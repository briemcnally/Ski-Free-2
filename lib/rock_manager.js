const Rock = require('./rock');

var previousTime = 0,
  INTERVAL = 30,
  W = 800,
  H = 600,
  avatar,
  treeManager,
  LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

function RockManager(options) {
  this.rocks = [];
  this.ROCK_SPEED = -10;
  this.ROCK_FREQUENCY = 900;
  this.spawnTimer = 0;
  this.spawnRock = function (currentTime) {
    var rock = new Rock(currentTime);
    rock.x = Math.random() * W;
    rock.y = H;
    this.rocks.push(rock);
  };
}

RockManager.prototype.update = function (timeElapsed, currentTime) {
  this.spawnTimer += timeElapsed;
  if (this.spawnTimer > this.ROCK_FREQUENCY) {
      this.spawnRock(currentTime);
      this.spawnTimer = 0;
  }
  for (var i = 0; i < this.rocks.length; i++ ) {
      var rock = this.rocks[i];
      if (rock !== null) {
          rock.y += this.ROCK_SPEED;
      }
  }
};

RockManager.prototype.draw = function (canvas, timeElapsed, currentTime) {
  var c = canvas.getContext("2d");
  for (var i = 0; i < this.rocks.length; i++ ) {
    var rock = this.rocks[i];
    if (rock !== null) {
      rock.draw (canvas, timeElapsed, currentTime);
    }
  }
};

module.exports = RockManager;
