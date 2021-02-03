
let quine;
let time = 0;
let testImage;

function preload() {
  testImage = loadImage("assets/images/test.jpg");
}

function setup() {
  createCanvas(600, 900);

  let testGraphics = createGraphics(width, height);
  testGraphics.background(255);
  testGraphics.fill(0);
  testGraphics.noStroke();
  for(let i = 0; i < width/10; i++) {
    for(let j = 0; j < width/10; j++) {
      if((i) % 2 == 0) {
        testGraphics.rect(i*width/10, j*height/10, width/10, height/10);
      }
    }
  }

  testImage = testGraphics.get();
  testImage.filter(GRAY);

  // testImage = testImage.get(0, 0, width, height);
  // quine = new MyQuine(testImage, width/3, height/3);

  button = createButton('save program');
  button.mousePressed(() => {
    quine.makeProgram();
    quine.saveProgram();
  });

  noLoop();
}

function draw() {
  background(0);
  // console.log(frameRate());
  
  image(testImage, 0, 0);
  // console.log(quine.simplified);
  // quine.xres = quine.yres = noise(time)*40;

  // if(frameCount % 200 == 0) {
  //   quine.xres = quine.yres = quine.xres * 2;
  //   quine.update();
  //   console.log(quine.xres);
  // }


  // quine.display();

  time += 0.02;
}

