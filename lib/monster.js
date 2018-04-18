function Monster(startTime) {
  this.x = 40;
  this.y = 40;
  this.image = new Image();
  this.image.src = "./assets/bear.png";
  this.startTime = startTime;
  this.draw = function (canvas, timeElapsed, currentTime) {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, this.x, this.y, 120, 120);
  };
}

module.exports = Monster;
