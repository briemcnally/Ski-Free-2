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

window.globalTimer = 0;

let interval;

function gameLoad(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  avatar = new Avatar({canvas: canvas, ctx: ctx});
  treeManager = new TreeManager();
  rockManager = new RockManager();
  monsterMovement = new MonsterMovement();
  const trees = treeManager.trees;
  const rocks = rockManager.rocks;
  const bears = monsterMovement.monsters;
  interval = setInterval(
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
      checkTreeCollision(avatar, trees);
      checkRockCollision(avatar, rocks);
      checkBearCollision(avatar, bears);
      if (window.globalTimer > 50000){
        clearInterval(interval);
        alert('You Won');
      }
    }
  , INTERVAL);
}

window.onload = function modal(cb){
  document.getElementById('button').onclick = function(){
    document.getElementById('modal').style.display = "none";
    gameLoad();
  };
};


function skierHitObject(cb){
  document.getElementById('game-over-modal').style.display = "block";
  clearInterval(interval);
  document.getElementById('restart-button').onclick = function(){
    document.getElementById('game-over-modal').style.display = "none";
    location.reload();
    gameLoad();
  };
}

function checkTreeCollision(skier, trees){
  const numTrees = trees.length;
  for (var i = 0; i < numTrees; i++) {
    const tree = treeManager.trees[i];
    if ((skier.x < tree.x + 20 && skier.x + 20 > tree.x) &&
        (skier.y < tree.y + 40 && skier.y + 30 > tree.y)){
          skierHitObject();
    }
  }
}


function checkRockCollision(skier, rocks){
  const numRocks = rocks.length;
  for (var i = 0; i < numRocks; i++) {
    const rock = rockManager.rocks[i];
    if ((skier.x <= rock.x + 30 && skier.x + 30 >= rock.x) &&
        (skier.y < rock.y + 50 && skier.y + 30 > rock.y)){
          skierHitObject();
      }
    }
  }

function checkBearCollision(skier, bears){
  const numBears = bears.length;
    for (var i = 0; i < numBears; i++) {
      const bear = rockManager.rocks[i];
      if ((skier.x < bear.x + 40 && skier.x + 40 > bear.x) &&
          (skier.y < bear.y + 40 && skier.y + 40 > bear.y)){
            skierHitObject();
          }
      }
}


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
