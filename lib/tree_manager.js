const Tree = require('./tree');

var previousTime = 0,
  INTERVAL = 30,
  W = 800,
  H = 600,
  avatar,
  treeManager,
  LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40,
  TIMER = 0,
  LEVEL_TIMER = 0;

function TreeManager(options) {
  this.trees = [];
  this.SPEED = -10;
  this.TREE_FREQUENCY = 500;
  this.treeTimer = 0;
  this.placeTree = function (currentTime) {
    var tree = new Tree(currentTime);
    tree.x = Math.random() * W;
    tree.y = H;
    console.log("Spawned tree");
    this.trees.push(tree);
  };
}

TreeManager.prototype.update = function (timeElapsed, currentTime) {
  TIMER += timeElapsed;
  console.log(TIMER);
  this.treeTimer += timeElapsed;
  // console.log(this.treeTimer);
  if (this.treeTimer > this.TREE_FREQUENCY) {
      this.placeTree(currentTime);
      this.treeTimer = 0;
  }

  if (TIMER > 500) {
    LEVEL_TIMER += TIMER;
    this.placeTree(currentTime);
    TIMER = 0;
  }

  if (LEVEL_TIMER > 1000){
    // LEVEL_TIMER += TIMER;
    this.placeTree(currentTime);
    LEVEL_TIMER = 0;
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
