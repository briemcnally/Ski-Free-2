function SpriteSheet(path, frameWidth, frameHeight){
  var image = new Image();
  var framesPerRow;

  var self = this;
  image.onload = function(){
    framesPerRow = Math.floor(image.width / frameWidth);
  };

  image.src = path;
}
