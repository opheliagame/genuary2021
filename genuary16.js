let time = 0;

function setup() {
    createCanvas(600, 900);
}

function draw() {
    translate(width/2, height/2);

    background(0);
    noFill();
    fill(0);
    stroke(255);
    strokeWeight(0.5);
    let a = 0;
    let b = 1.2 * 1;
    let diff = 200*PI/200;
    for(let i = 0; i < 350*PI; i+=diff) {
        let x = cos(radians(i*2)+time) * (a + b * i);
        let y = sin(radians(i*2)+time) * (a + b * i);
        // let x2 = cos(radians(i+1)) * (r+(i+1)/10);
        // let y2 = sin(radians(i+1)) * 

        // circle(x, y, 5);
        // let uv = map(i, 0, 1000, 0, 1);
        // uv = fract(uv);
        circle(x, y, (a + b * i)*1.3);
        // uv += map(i, 0, 1000, 0.0005, 0.005);
        // uv += abs(sin(time/5))/200;
    }
    
    time = 100;
}