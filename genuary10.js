let tree;
let mytex;
let font;
let sh;

function preload() {
  font = loadFont("assets/fonts/Raleway-Medium.ttf");
  sh = loadShader("assets/shaders/gen10shader.vert", "assets/shaders/gen10shader.frag");
}

function setup() {
  createCanvas(500, 500, WEBGL);

  mytex = new MyTex(font, 128, "men i trust ", sh);
  mytex.draw();
  tree = new MyTree(0.5, 75, mytex.textureImg);
  var button = createButton("make branch!");
  button.mousePressed(() => {
    let p = tree.points[Math.floor(random(tree.points.length))];
    console.log(tree.points.length);
    tree.trees.push(tree.makeBranch(tree.len, p, random([PI, TWO_PI])));
  });

  frameRate(30);
}

function draw() {
  background(0);

  // sh.setUniform("")
  // shader(sh);
  // rect(0, 0, width, height);

  translate(-width/2, -height/2);
  mytex.draw();
  tree.texture = mytex.texture;
  tree.displayTree();

}

