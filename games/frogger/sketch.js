// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow

var img, frogimg, grass, log1, log2, log3, car, bus, motorbike;
var cnv, volslider, song, gameover;
var frog;

var grid_size = 50;

var rows = [];

// Handles game reset if the frog dies, or at the initial load.
function resetGame() {
  frog = new Frog(width / 2 - grid_size / 2, height - grid_size, grid_size, frogimg);
}

function preload(){
  frogimg = loadImage('../../img/frogger.png');
  grass = loadImage('../../img/grass.png');
  log1 = loadImage('../../img/log1.png');
  log2 = loadImage('../../img/log2.png');
  log3 = loadImage('../../img/log3.png');
  car = loadImage('../../img/car1.png');
  bus = loadImage('../../img/car3.png');
  motorbike = loadImage('../../img/car2.png');

  gameover = loadSound("../../sounds/game_over.mp3");
}

// p5js setup function, ran on page load.
function setup() {
  width = 500;
  rows = [
    new Lane(            0, 1,    0,         width,   0,   0, true, grass),
    new Lane(    grid_size, 1,    0,         width,   0,   0, true, grass),
    // new Lane(    grid_size, 4,    0,          87.5,  50,   0, true),
    new Lane(2 * grid_size, 2,  0.5, 4 * grid_size, 400,  10, true, log1),
    new Lane(3 * grid_size, 3, -1.3, 2 * grid_size, 200,  30, true, log3),
    new Lane(4 * grid_size, 2,  2.3, 3 * grid_size, 250,  25, true, log2),
    new Lane(5 * grid_size, 1,    0,         width,   0,   0, true, grass),
    new Lane(6 * grid_size, 3,  1.2, 1 * grid_size, 150, 100, false, motorbike),
    new Lane(7 * grid_size, 2, -3.5, 1 * grid_size, 200, 150, false, car),
    new Lane(8 * grid_size, 2,    2, 2 * grid_size, 300,   0, false, bus),
    new Lane(9 * grid_size, 2,    0,         width,   0,   0, true, grass),
  ];
  cnv= createCanvas(width, rows.length * grid_size);
  img = loadImage("../../img/froggercanvas.png"); 
  cnv.parent("game-canvas");
  resetGame();

  // Audio
  song = loadSound("../../sounds/Androids.wav", loaded);
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.parent("adjust-volume");
}

function loaded(){
  song.loop();
}

// p5js draw function, ran on every frame.
function draw() {
  // background(0);
  // fill(255, 100);
  img.resize(0, width);
  image(img, 0, 0);

  var intersects = null;

  //for every lane, check if frog is in it.
  for(var i = 0; i < rows.length; i++) {
    rows[i].show();
    rows[i].update();
    if(frog.intersects(rows[i])) {
      intersects = rows[i].hits(frog); 
      //if frog is in it, check if frog hits an obstacle (& implicitly: not on log) 
      //XOR frog is on log (& implicitly: not hitting obstacle)
      if((intersects !== null) ^ rows[i].inverted) {
        gameover.play();
        resetGame();
      }
    }
  }
  frog.attach(intersects);    //frog attaches to whatever it intersects (null or obstacle).
  frog.update();              //and adopts its speed.
  frog.show();

  song.setVolume(slider.value());
  gameover.setVolume(slider.value());
}

// p5js key pressed function, runs when any key is pressed on the keyboard
// while the game is open.
function keyPressed() {
  if(keyCode === 87) {            //up
    frog.move(0, -grid_size);
  } else if(keyCode === 83) {     //down
    frog.move(0, grid_size);
  } else if(keyCode === 65) {     //left
    frog.move(-grid_size, 0);
  } else if(keyCode === 68) {     //right
    frog.move(grid_size, 0);
  }
}