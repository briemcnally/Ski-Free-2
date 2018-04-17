const Avatar = require('./skier');
const Tree = require('./tree');
const TreeManager = require('./tree_manager');

var previousTime = 0,
  INTERVAL = 30,
  W = 800,
  H = 600,
  avatar,
  treeManager,
  LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

window.onload = function(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  console.log(new Avatar);
  avatar = new Avatar({canvas: canvas, ctx: ctx});
  treeManager = new TreeManager();
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
      draw(canvas, timeElapsed, currentTime);
      previousTime = currentTime;
    }
  , INTERVAL);
};

function draw (canvas, timeElapsed, currentTime) {
  var c = canvas.getContext("2d");
  clearCanvas(canvas);
  treeManager.draw(canvas, timeElapsed, currentTime);
  avatar.draw(c);
}

function clearCanvas(canvas) {
  var c = canvas.getContext("2d");
  c.beginPath();
  c.rect(0,0,W,H);
  c.fillStyle = "white";
  c.fill();
}
