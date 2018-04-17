const Tree = require('./tree');

var previousTime = 0,
  INTERVAL = 30,
  W = 800,
  H = 600,
  avatar,
  treeManager,
  LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

function TreeManager(options) {
  this.trees = [];
  this.SPEED = -10;
  this.SPAWN_FREQUENCY = 500;
  this.spawnTimer = 0;
  this.spawnTree = function (currentTime) {
    var tree = new Tree(currentTime);
    tree.x = Math.random() * W;
    tree.y = H;
    console.log("Spawned tree");
    this.trees.push(tree);
  };
}

TreeManager.prototype.update = function (timeElapsed, currentTime) {
  this.spawnTimer += timeElapsed;
  if (this.spawnTimer > this.SPAWN_FREQUENCY) {
      this.spawnTree(currentTime);
      this.spawnTimer = 0;
  }
  for (var i = 0; i < this.trees.length; i++ ) {
      var tree = this.trees[i];
      if (tree !== null) {
          tree.y += this.SPEED;
      }
  }
};

TreeManager.prototype.draw = function (canvas, timeElapsed, currentTime) {
  var c = canvas.getContext("2d");
  for (var i = 0; i < this.trees.length; i++ ) {
    var tree = this.trees[i];
    if (tree !== null) {
      tree.draw (canvas, timeElapsed, currentTime);
    }
  }
};

module.exports = TreeManager;
