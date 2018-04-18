const Avatar = require('./skier');
const Tree = require('./tree');
const TreeManager = require('./tree_manager');
const Rock = require('./rock');
const RockManager = require('./rock_manager');
const MonsterMovement = require('./monster_movement');

var previousTime = 0,
  INTERVAL = 30,
  W = 800,
  H = 600,
  avatar,
  treeManager,
  rockManager,
  monsterMovement,
  LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

window.onload = function(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  avatar = new Avatar({canvas: canvas, ctx: ctx});
  treeManager = new TreeManager();
  rockManager = new RockManager();
  monsterMovement = new MonsterMovement();
  const trees = treeManager.trees;
  const rocks = rockManager.rocks;
  setInterval(
    function () {
      var currentTime = new Date().getTime(),
          timeElapsed;
      if (previousTime === 0) {
          previousTime = currentTime;
      }
      timeElapsed = currentTime - previousTime;
      avatar.update(timeElapsed, currentTime);
      treeManager.update(timeElapsed, currentTime);
      rockManager.update(timeElapsed, currentTime);
      monsterMovement.update(timeElapsed, currentTime);
      draw(canvas, timeElapsed, currentTime);
      previousTime = currentTime;
      checkCollision(avatar, trees);
    }
  , INTERVAL);
};

//clear interval

function checkCollision(skier, trees){
  const numTrees = trees.length;
  for (var i = 0; i < numTrees; i++) {
    const tree = treeManager.trees[i];
    if ((skier.x < tree.x + 40 && skier.x + 40 > tree.x) &&
        (skier.y < tree.y + 40 && skier.y + 40 > tree.y)){
          // alert('Game Over');
          // location.reload();
          skier.skierHitTree(skier, tree);
      }
  }
}

Avatar.prototype.skierHitTree = function(skier, tree){
  skier.y -= 50;
};

function draw (canvas, timeElapsed, currentTime) {
  var c = canvas.getContext("2d");
  clearCanvas(canvas);
  avatar.draw(c);
  treeManager.draw(canvas, timeElapsed, currentTime);
  rockManager.draw(canvas, timeElapsed, currentTime);
  monsterMovement.draw(canvas, timeElapsed, currentTime);
}

function clearCanvas(canvas) {
  var c = canvas.getContext("2d");
  c.beginPath();
  c.rect(0,0,W,H);
  c.fillStyle = "white";
  c.fill();
}
