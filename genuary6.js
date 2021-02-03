let triangles = [];
let subCount = 0;
let time = 0;
let font;

function preload() {
  font = loadFont('assets/fonts/amiri.ttf');
}

function setup() {
  createCanvas(650, 650);

  textFont(font);
  textSize(128-32);
  frameRate(30);
}

function draw() {
  background(0);
  // console.log(frameRate());

  translate(width/2, height/2);
  let caption = "بانٹنا";
  fill(255);
  textAlign(CENTER, CENTER);
  text(caption, 0, -30);
  

  triangles = [];

  let lerpFactor = map(abs(sin(time)), 0, 1, 0.2, 0.6);
  let radius = width/2 - 100;
  let diff = TWO_PI/4;
  for(let i = TWO_PI; i > 0; i -= diff) {
    let x1 = cos(i) * radius;
    let y1 = sin(i) * radius;
    let x2 = cos(i-diff/2) * (radius+100);
    let y2 = sin(i-diff/2) * (radius+100);
    let x3 = cos(i-diff) * radius;
    let y3 = sin(i-diff) * radius;
    let x4 = cos(i-diff-diff/2) * (radius+100);
    let y4 = sin(i-diff-diff/2) * (radius+100);

    // vertex(x, y);
    // vertex(x+50, y+50);

    let first = new MyTriangle(
      createVector(x1, y1),
      createVector(x2, y2),
      createVector(x3, y3),
      lerpFactor
    );
    let second = new MyTriangle(
      createVector(x2, y2),
      createVector(x3, y3),
      createVector(x4, y4),
      lerpFactor
    );
  }

  for(let i = 0; i < triangles.length; i++) {
    let t = triangles[i];
    t.display();
  }

  time += 0.01;
}
