let font;
let mytex;
let mirrorSh, mirrorTex;
let tess;

function preload() {
  font = loadFont("assets/fonts/poppins.ttf");
  mirrorSh = loadShader(
    "assets/shaders/gen4shader.vert", "assets/shaders/gen4shader.frag"
  );
}

function setup() {
  createCanvas(600, 600);

  mirrorTex = createGraphics(width, height, WEBGL);

  mytex = new MyTex(font, 256, "खोज");
  mytex.draw();
  
  
  tess = new SimpleRect1(2, mirrorTex);
}

function draw() {
  background(220);

  mirrorSh.setUniform(
    "resolution", 
    [float(width), float(height)]);
  mirrorSh.setUniform("time", millis()/4000.0);
  mirrorSh.setUniform("tex", mytex.texture);

  mirrorTex.shader(mirrorSh);
  mirrorTex.rect(0, 0, width/2, height/2);

  tess.display();
}
