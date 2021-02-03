class MyQuine {
    constructor(img, xres, yres) {
        this.img = img;
        this.xres = xres;
        this.yres = yres;

        this.simplified = [];
        this.program = [];
        this.make();
        this.makeProgram();
    }

    make() {
        this.simplified = [];

        let imgW = this.img.width;
        let imgH = this.img.height;
        let xSize = imgW/this.xres;
        let ySize = imgH/this.yres;

        console.log(xSize, ySize);

        // creating a simplified array 
        for(let j = 0; j < imgH; j+=ySize) {
            for(let i = 0; i < imgW; i+=xSize) {
                // get img for this block
                let sub = this.img.get(i, j, xSize-1, ySize-1);
                sub.loadPixels();
                let subPixels = sub.pixels;
                // let subValue = subPixels.reduce((a, b) => a+b, 0);
                let subValue = subPixels[Math.floor(random(subPixels.length))];
                // console.log(subPixels);
                this.simplified.push({
                    x: i+xSize/2,
                    y: j+ySize/2,
                    value: subValue
                });
            }
        }
    }

    update() {
        this.make();
        // this.makeProgram();
    }

    makeProgram() {
        this.program = [];
        this.program.push("function setup() {");
        this.program.push(`createCanvas(${width}, ${height})}`);
        this.program.push("function draw(){");

        // making the rules
        for(let i = 0; i < this.simplified.length-1; i++) {
            // check against next one
            let p1 = this.simplified[i];
            let p2 = this.simplified[i+1];

            if(p2.value > p1.value) {
                // strokeWeight(2);
                // line(p1.x, p1.y, p2.x, p2.y);

                this.program.push(`line(${p1.x}, ${p1.y}, ${p2.x}, ${p2.y})`);
            }
        }

        this.program.push("}");

        // console.log(this.program);
    }

    display() {
        // making the rules
        // beginShape(TRIANGLE_STRIP);
        for(let i = 0; i < this.simplified.length-1; i++) {
            // check against next one
            let p1 = this.simplified[i];
            let p2 = this.simplified[i+1];

            if(p2.value > p1.value) {
                // strokeWeight(2);
                stroke(255);
                line(p1.x, p1.y, p2.x, p2.y);
                // vertex(p1.x, p1.y);
                // vertex(p2.x, p2.y);
            }
        }
        // endShape();
    }

    saveProgram() {
        saveStrings(this.program, "myprogram.js");
    }
}