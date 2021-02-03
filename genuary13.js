let myLSystem;

function setup() {
  createCanvas(400, 400);

  myLSystem = new PenroseLSystem();
  myLSystem.simulate(4);
  frameRate(30);
}

function draw() {
  background(0);

  myLSystem.render();
}
