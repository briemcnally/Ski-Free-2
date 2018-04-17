function Tree (startTime) {
  this.x = 0;
  this.y = 0;
  this.image = new Image();
  this.image.src = "./assets/pine_tree.png";
  this.startTime = startTime;
  this.draw = function (canvas, timeElapsed, currentTime) {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, this.x, this.y, 90, 90);
  };
}

module.exports = Tree;
