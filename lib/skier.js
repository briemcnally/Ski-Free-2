var previousTime = 0,
  INTERVAL = 30,
  W = 800,
  H = 600,
  avatar,
  treeManager,
  LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

function Avatar(options) {
    // position
    this.x = W/2;
    this.y = 30;
    // velocity
    this.vx = 10;
    this.vy = 10;
    // view
    this.imageL = new Image();
    this.imageL.src = "./assets/skier_left.png";
    this.imageR = new Image();
    this.imageR.src = "./assets/skier_right.png";
    this.imageDown = new Image();
    this.imageDown.src = "./assets/skier_down.png";

    this.facing = "";
  }

Avatar.prototype.draw = function (context) {
  if (this.facing === 'left') {
    context.drawImage(this.imageL, this.x, this.y, 80, 80);
  } else if (this.facing === 'right') {
    context.drawImage(this.imageR, this.x, this.y, 80, 80);
  } else if (this.facing === 'down'){
    context.drawImage(this.imageR, this.x, this.y, 80, 80);
  } else {
    context.drawImage(this.imageL, this.x, this.y, 80, 80);
  }
};

Avatar.prototype.update = function(timeElapsed, currentTime) {
  // treeManager.update(timeElapsed, currentTime);
  if (key.isPressed(RIGHT)) {
      this.x += this.vx;
      this.facing = "right";
  }
  if (key.isPressed(LEFT)) {
      this.x -= this.vx;
      this.facing = "left";
  }
  if (key.isPressed(UP)) {
      this.y -= this.vy;
      this.facing = "right";
  }
  if (key.isPressed(DOWN)) {
      this.y += this.vy;
      this.facing = "down";
  }
};

module.exports = Avatar;
