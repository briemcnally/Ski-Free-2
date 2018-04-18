const Monster = require('./monster');

var previousTime = 0,
  INTERVAL = 30,
  W = 800,
  H = 600,
  avatar,
  treeManager,
  LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

function MonsterMovement(options) {
  this.monsters = [];
  this.SPEED = -10;
  this.MONSTER_FREQUENCY = 10000;
  this.monsterTimer = 0;
  this.placeMonster = function (currentTime) {
    var monster = new Monster(currentTime);
    monster.x = W;
    monster.y = Math.random() * H;
    console.log("Spawned monster");
    this.monsters.push(monster);
  };
}

MonsterMovement.prototype.update = function (timeElapsed, currentTime) {
  this.monsterTimer += timeElapsed;
  // debugger
  if (this.monsterTimer > this.MONSTER_FREQUENCY) {
      this.placeMonster(currentTime);
      this.monsterTimer = 0;
  }

  for (var i = 0; i < this.monsters.length; i++ ) {
      var monster = this.monsters[i];
      if (monster !== null) {
        monster.x += this.SPEED;
        monster.y = 40 * Math.sin((5) * monster.x) + 150;
      }
  }
};

MonsterMovement.prototype.draw = function (canvas, timeElapsed, currentTime) {
  var c = canvas.getContext("2d");
  for (var i = 0; i < this.monsters.length; i++ ) {
    var monster = this.monsters[i];
    if (monster !== null) {
      monster.draw (canvas, timeElapsed, currentTime);
    }
  }
};

module.exports = MonsterMovement;
