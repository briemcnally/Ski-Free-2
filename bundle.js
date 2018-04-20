/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tree = __webpack_require__(1);

var previousTime = 0,
    INTERVAL = 30,
    W = 800,
    H = 600,
    avatar,
    treeManager,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    TIMER = 0,
    LEVEL_TIMER = 500;

function TreeManager(options) {
  this.trees = [];
  this.SPEED = -10;
  this.TREE_FREQUENCY = 500;
  this.treeTimer = 0;
  this.placeTree = function (currentTime) {
    var tree = new Tree(currentTime);
    tree.x = Math.random() * W;
    tree.y = H;
    this.trees.push(tree);
  };
}

TreeManager.prototype.update = function (timeElapsed, currentTime) {
  TIMER += timeElapsed;
  this.treeTimer += timeElapsed;
  if (this.treeTimer > this.TREE_FREQUENCY) {
    this.placeTree(currentTime);
    this.treeTimer = 0;
  }

  if (TIMER > 500) {
    LEVEL_TIMER += TIMER;
    this.placeTree(currentTime);
    TIMER = 0;
  }

  if (LEVEL_TIMER > 1000) {
    LEVEL_TIMER += TIMER;
    this.placeTree(currentTime);
    LEVEL_TIMER = 0;
  }

  if (window.globalTimer > 10000) {
    this.TREE_FREQUENCY = 350;
  }

  if (window.globalTimer > 20000) {
    this.TREE_FREQUENCY = 250;
  }

  if (window.globalTimer > 25000) {
    this.TREE_FREQUENCY = 200;
  }

  if (window.globalTimer > 34000) {
    this.TREE_FREQUENCY = 100;
  }

  for (var i = 0; i < this.trees.length; i++) {
    var tree = this.trees[i];
    if (tree !== null) {
      tree.y += this.SPEED;
    }
  }
};

TreeManager.prototype.draw = function (canvas, timeElapsed, currentTime) {
  var c = canvas.getContext("2d");
  for (var i = 0; i < this.trees.length; i++) {
    var tree = this.trees[i];
    if (tree !== null) {
      tree.draw(canvas, timeElapsed, currentTime);
    }
  }
};

module.exports = TreeManager;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Tree(startTime) {
  this.x = 0;
  this.y = 0;
  this.image = new Image();
  this.image.src = "./assets/pine_tree.png";
  this.startTime = startTime;
  this.draw = function (canvas, timeElapsed, currentTime) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, this.x, this.y, 90, 90);
  };
}

module.exports = Tree;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Avatar = __webpack_require__(3);
var Tree = __webpack_require__(1);
var TreeManager = __webpack_require__(0);
var Rock = __webpack_require__(4);
var RockManager = __webpack_require__(5);
var MonsterMovement = __webpack_require__(6);

var previousTime = 0,
    INTERVAL = 30,
    W = 800,
    H = 600,
    avatar,
    treeManager,
    rockManager,
    monsterMovement,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;

window.globalTimer = 0;

var interval = void 0;

function gameLoad() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  // const audio = document.getElementById("audio");
  // audio.play();

  avatar = new Avatar({ canvas: canvas, ctx: ctx });
  treeManager = new TreeManager();
  rockManager = new RockManager();
  monsterMovement = new MonsterMovement();
  var trees = treeManager.trees;
  var rocks = rockManager.rocks;
  var bears = monsterMovement.monsters;
  interval = setInterval(function () {
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
    if (window.globalTimer > 50000) {
      clearInterval(interval);
      playerWon();
    }
  }, INTERVAL);
}

window.onload = function modal(cb) {
  document.getElementById('button').onclick = function () {
    document.getElementById('modal').style.display = "none";
    gameLoad();
  };
};

function skierHitObject(cb) {
  document.getElementById('game-over-modal').style.display = "block";
  clearInterval(interval);
  document.getElementById('restart-button').onclick = function () {
    document.getElementById('game-over-modal').style.display = "none";
    location.reload();
    gameLoad();
  };
}

function playerWon(cb) {
  document.getElementById('game-won-modal').style.display = "block";
  clearInterval(interval);
  document.getElementById('replay-button').onclick = function () {
    document.getElementById('game-won-modal').style.display = "none";
    location.reload();
    gameLoad();
  };
}

function checkTreeCollision(skier, trees) {
  var numTrees = trees.length;
  for (var i = 0; i < numTrees; i++) {
    var tree = treeManager.trees[i];
    if (skier.x < tree.x + 20 && skier.x + 20 > tree.x && skier.y < tree.y + 40 && skier.y + 30 > tree.y) {
      skierHitObject();
    }
  }
}

function checkRockCollision(skier, rocks) {
  var numRocks = rocks.length;
  for (var i = 0; i < numRocks; i++) {
    var rock = rockManager.rocks[i];
    if (skier.x < rock.x + 40 && skier.x + 50 > rock.x && skier.y < rock.y + 30 && skier.y + 50 > rock.y) {
      skierHitObject();
    }
  }
}

function checkBearCollision(skier, bears) {
  var numBears = bears.length;
  for (var i = 0; i < numBears; i++) {
    var bear = rockManager.rocks[i];
    if (skier.x < bear.x + 40 && skier.x + 50 > bear.x && skier.y < bear.y + 40 && skier.y + 50 > bear.y) {
      skierHitObject();
    }
  }
}

function draw(canvas, timeElapsed, currentTime) {
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
  c.rect(0, 0, W, H);
  c.fillStyle = "white";
  c.fill();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TreeManager = __webpack_require__(0);

var previousTime = 0,
    INTERVAL = 30,
    W = 800,
    H = 600,
    avatar,
    treeManager,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;

function Avatar(options) {
  // position
  this.x = W / 2;
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
    context.drawImage(this.imageL, this.x, this.y, 70, 80);
  } else if (this.facing === 'right') {
    context.drawImage(this.imageR, this.x, this.y, 70, 80);
  } else if (this.facing === 'down') {
    context.drawImage(this.imageR, this.x, this.y, 70, 80);
  } else {
    context.drawImage(this.imageL, this.x, this.y, 70, 80);
  }
};

Avatar.prototype.update = function (timeElapsed, currentTime) {
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
  window.globalTimer += timeElapsed;
};

module.exports = Avatar;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Rock(startTime) {
  this.x = 0;
  this.y = 0;
  this.image = new Image();
  this.image.src = "./assets/rock.png";
  this.startTime = startTime;
  this.draw = function (canvas, timeElapsed, currentTime) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, this.x, this.y, 40, 30);
  };
}

module.exports = Rock;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Rock = __webpack_require__(4);

var previousTime = 0,
    INTERVAL = 30,
    W = 800,
    H = 600,
    avatar,
    treeManager,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;

function RockManager(options) {
  this.rocks = [];
  this.ROCK_SPEED = -10;
  this.ROCK_FREQUENCY = 900;
  this.spawnTimer = 0;
  this.spawnRock = function (currentTime) {
    var rock = new Rock(currentTime);
    rock.x = Math.random() * W;
    rock.y = H;
    this.rocks.push(rock);
  };
}

RockManager.prototype.update = function (timeElapsed, currentTime) {
  this.spawnTimer += timeElapsed;
  if (this.spawnTimer > this.ROCK_FREQUENCY) {
    this.spawnRock(currentTime);
    this.spawnTimer = 0;
  }
  for (var i = 0; i < this.rocks.length; i++) {
    var rock = this.rocks[i];
    if (rock !== null) {
      rock.y += this.ROCK_SPEED;
    }
  }
};

RockManager.prototype.draw = function (canvas, timeElapsed, currentTime) {
  var c = canvas.getContext("2d");
  for (var i = 0; i < this.rocks.length; i++) {
    var rock = this.rocks[i];
    if (rock !== null) {
      rock.draw(canvas, timeElapsed, currentTime);
    }
  }
};

module.exports = RockManager;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Monster = __webpack_require__(7);

var previousTime = 0,
    INTERVAL = 30,
    W = 800,
    H = 600,
    avatar,
    treeManager,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;

function MonsterMovement(options) {
  this.monsters = [];
  this.SPEED = -10;
  this.MONSTER_FREQUENCY = 10000;
  this.monsterTimer = 0;
  this.placeMonster = function (currentTime) {
    var monster = new Monster(currentTime);
    monster.x = W;
    monster.y = Math.random() * H;
    // console.log("Spawned monster");
    this.monsters.push(monster);
  };
}

MonsterMovement.prototype.update = function (timeElapsed, currentTime) {
  this.monsterTimer += timeElapsed;
  // debugger
  if (this.monsterTimer > this.MONSTER_FREQUENCY) {
    this.placeMonster(currentTime);
    this.monsterTimer = 0;
  }

  for (var i = 0; i < this.monsters.length; i++) {
    var monster = this.monsters[i];
    if (monster !== null) {
      monster.x += this.SPEED;
      monster.y = 40 * Math.sin(5 * monster.x) + 150;
    }
  }
};

MonsterMovement.prototype.draw = function (canvas, timeElapsed, currentTime) {
  var c = canvas.getContext("2d");
  for (var i = 0; i < this.monsters.length; i++) {
    var monster = this.monsters[i];
    if (monster !== null) {
      monster.draw(canvas, timeElapsed, currentTime);
    }
  }
};

module.exports = MonsterMovement;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Monster(startTime) {
  this.x = 40;
  this.y = 40;
  this.image = new Image();
  this.image.src = "./assets/bear.png";
  this.startTime = startTime;
  this.draw = function (canvas, timeElapsed, currentTime) {
    var ctx = canvas.getContext("2d");
    ctx.drawImage(this.image, this.x, this.y, 120, 120);
  };
}

module.exports = Monster;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map