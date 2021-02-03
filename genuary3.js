let font;
let vehicles = [], targets = [];
let fontSize = 192;
let width = 700, height = 600;
let textParams = [
  {word: "be", x:0, y: height/2*0.75},
  {word: "human", x:0, y:height*0.75},
  {word: "make", x:0, y:height/2*0.75},
  {word: "waste", x:0, y:height*0.75}
]
let img;
let sh, shCanvas;
let time = 0.0;

function preload() {
  font = loadFont("assets/fonts/Raleway-Medium.otf");
  img = loadImage("assets/emoji/1.png");
  sh = loadShader("assets/shaders/gen3shader.vert", "assets/shaders/gen3shader.frag");
}

function setup() {
  createCanvas(width, height);
  textFont(font);

  shCanvas = createGraphics(width, height, WEBGL);

  for(let i = 0; i < textParams.length/2; i++) {
    let tp = textParams[i];
    let bounds = font.textBounds(tp.word, tp.x, tp.y, fontSize);
    let xCentered = width/2 - bounds.w/2;
    // rect(xCentered, bounds.y, bounds.w, bounds.h);

    let points = font.textToPoints(tp.word, xCentered, tp.y, fontSize);
    targets = targets.concat(points);
  }
   
  for(let i = 0; i < targets.length; i++) {
    let p = targets[i];
    let vehicle = new Vehicle(p.x, p.y);
    vehicles.push(vehicle);
  }

  frameRate(30);
}

function nodraw() {
  

  time += 0.005;
}

function draw() {
  // background(0);

  sh.setUniform("resolution", [float(width), float(height)]);
  sh.setUniform("time", time);
  shCanvas.shader(sh);
  shCanvas.rect(0, 0, width/2, height/2);

  image(shCanvas, 0, 0);

  if(frameCount % 300 == 0) {
    textParams = textParams.slice(2).concat(textParams.slice(0, 2));

    targets = [];

    for(let i = 0; i < textParams.length/2; i++) {
      let tp = textParams[i];
      let bounds = font.textBounds(tp.word, tp.x, tp.y, fontSize);
      // fill(255, 0, 0);
      let xCentered = width/2 - bounds.w/2;
      // rect(xCentered, bounds.y, bounds.w, bounds.h);
  
      let points = font.textToPoints(tp.word, xCentered, tp.y, fontSize);
      targets = targets.concat(points);
    }

    // checking if new targets less or greater than previous
    let diff = Math.abs(targets.length - vehicles.length);
    let increase = targets.length > vehicles.length;
    
    for(let i = 0; i < diff; i++) {
      let rIndex = Math.floor(random(vehicles.length));
      // remove or add some vehicles
      if(increase) {
        // add vehicles
        let v = vehicles[rIndex];
        let newv = new Vehicle(v.pos.x, v.pos.y);
        newv.pos = createVector(v.pos.x, v.pos.y);
        vehicles.push(newv);
      }
      else {
        // remove vehicles
        vehicles = vehicles.slice(0, rIndex).concat(vehicles.slice(rIndex+1));
      }
    }

    for(let i = 0; i < targets.length; i++) {
      // console.log(i);
      let p = targets[i];
      let vehicle = vehicles[i];
      vehicle.target = createVector(p.x, p.y);
    }
  }

  for(let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviours();
    v.update();
    v.display();
  }

  time += 0.01;
}
