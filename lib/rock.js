function Rock(startTime) {
  this.x = 0;
  this.y = 0;
  this.image = new Image();
  this.image.src = "./assets/rock.png";
  this.startTime = startTime;
  this.draw = function (canvas, timeElapsed, currentTime) {
    const ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, this.x, this.y, 40, 30);
  };
}

module.exports = Rock;
