// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

var fruits = [], fruit;
var head, tail, body;

var img;

var cnv, volslider, song, crunch, gameover;
var snake, food;    //food is a vector (stores xy position)


var grid_size = 20;

function preload(){
  fruits[0] = loadImage('../../img/fruit1.png');
  fruits[1] = loadImage('../../img/fruit2.png');
  fruits[2] = loadImage('../../img/fruit3.png');
  head = loadImage('../../img/snakehead.png');
  body = loadImage('../../img/snakebody.png');
  tail = loadImage('../../img/snaketail.png');

  gameover = loadSound("../../sounds/game_over.mp3");
  crunch = loadSound("../../sounds/crunch.mp3");
}

// Handles game reset if the frog dies, or at the initial load.
function resetGame() {
  snake = new Snake(head, body, tail);
  pickLocation();
}

//pick a random fruit and its location.
function pickLocation(){
  //get total number of possible grid positions
  var grids = floor(width/grid_size);
  food = createVector(floor(random(2, grids - 2)), floor(random(2, grids - 2)));
  food.mult(grid_size);
  fruit = floor(random(0, fruits.length));
}

// p5js setup function, ran on page load.
function setup() {
  width = 540;
  frameRate(8.5);
  cnv= createCanvas(width, width);
  img = loadImage("../../img/snakecanvas.png"); 
  cnv.parent("game-canvas");
  resetGame();

  // Audio
  song = loadSound("../../sounds/Androids.wav", loaded);
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.parent("adjust-volume");

  //Images
  imageMode(CENTER);
  angleMode(DEGREES);
}

function loaded(){
  song.loop();
}

// p5js draw function, ran on every frame.
function draw() {
  // background(0);
  // fill(255, 100);
  img.resize(0, width);
  image(img, width/2, width/2);

  snake.update();
  snake.show();

  //draw food
  // fill(255, 0, 100);
  // rect(food.x, food.y, grid_size, grid_size);
  fruits[fruit].resize(grid_size, grid_size);
  image(fruits[fruit], food.x + grid_size/2, food.y + grid_size/2);

  if(snake.eat(food)){
    crunch.play();
    pickLocation();
  }

  if(snake.dies()){
    gameover.play();
    resetGame();
  }
  
  song.setVolume(slider.value());
  crunch.setVolume(slider.value());
  gameover.setVolume(slider.value());
}

// p5js key pressed function, runs when any key is pressed on the keyboard
// while the game is open.
function keyPressed() {
  if(keyCode === 87) {            //up
    snake.move(0, -1);
  } else if(keyCode === 83) {     //down
    snake.move(0, 1);
  } else if(keyCode === 65) {     //left
    snake.move(-1, 0);
  } else if(keyCode === 68) {     //right
    snake.move(1, 0);
  }
}