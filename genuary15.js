let font;
let fontTexture;
let time = 0.0;

function preload() {
    font = loadFont('assets/fonts/poppins.ttf');
}

function setup() {
    createCanvas(600, 600, WEBGL);
    fontTexture = new MyTex(font, 128, 'गोल गोल ');
    fontTexture.draw();
    frameRate(30);
}

function draw() {
    background(0);
    // image(fontTexture.texture, -width/2, -height/2);

    textureMode(NORMAL);
    texture(fontTexture.texture);
    // noFill();
    // noStroke();
    beginShape(TRIANGLE_STRIP);
    let r = 0;
    let uv = 0;
    for(let i = 0; i < 1500; i++) {
        let x = cos(radians(i)+time) * (r+i/10);
        let y = sin(radians(i)+time) * (r+i/10);
        // let x2 = cos(radians(i+1)) * (r+(i+1)/10);
        // let y2 = sin(radians(i+1)) * 

        // circle(x, y, 5);
        // let uv = map(i, 0, 1000, 0, 1);
        uv = fract(uv);
        vertex(x, y, uv, 1);
        vertex(x*2, y*2, uv, 0);
        uv += map(i, 0, 1000, 0.0005, 0.005);
        uv += abs(sin(time/5))/200;
    }
    endShape();

    time += 0.02;
}