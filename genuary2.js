let automata;
let time = 0;
let mytex;
let font;

function preload() {
  font = loadFont("assets/fonts/Raleway-Medium.otf");
}

function setup() {
  createCanvas(900, 1600, WEBGL);

  automata = new Rule30(50, 30);
  automata.init("random");

  mytex = new MyTex(font, 128, "automata ");
                    
  mytex.draw();

  frameRate(5);
  // createLoop({gif: true, duration: 10});
}

function draw() {
  background(0);
  translate(-width/2, -height/2);

  // image(mytex.texture, 0, 0);

  automata.update();
  // automata.display();
  automata.marching_squares();

  time += float(frameCount)/10000;
}
