let mytex;
let font;
let time = 0;

function preload() {
  font = loadFont("assets/fonts/Raleway-Medium.ttf");
}

function setup() {
  createCanvas(600, 600, WEBGL);

  mytex = new MyTex(font, 256, "listen");
  mytex.draw();

  frameRate(30);
}

function draw() {
  translate(-width/2, -height/2);

  background(0);
  // fill(0, 3);
  // rect(0, 0, width, height);


  // image(mytex.texture, 0, 0);

  textureMode(NORMAL);
  texture(mytex.texture);
  // noFill();
  // stroke(255);
  // translate(0, 50);
  beginShape(TRIANGLE_STRIP);
  let diff = width/100;
  for(let i = 0; i <= width; i++) {
    let x = i;
    // let uv = map(x, 0, width, 0, 1);

    let wave1 = sin(radians(i/2)+PI);
    let wave2 = sin(radians(i/2)+time);
    let interference = map(wave1+wave2, -2, 2, 0, 1);
    let uv = interference;
    // interference = wave1 + wave2;

    // vertex(interference, 0);
    // vertex(i, interference);

    vertex(x, height/2 - (uv+0.2)*200, uv, 0);
    vertex(x, height/2 + (uv+0.2)*200, uv, 1);

    // vertex(x, uv*height - 100);
    // vertex(x, uv*height + 100);
  }
  endShape();

  time += 0.05;
}
