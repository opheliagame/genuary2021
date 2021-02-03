class SimpleRect {
    constructor(rows, cols, texture) {
        this.rows = rows;
        this.cols = cols;
        this.xSize = width/cols;
        this.ySize = height/rows;
        this.tex = texture;

        console.log("rows ", this.rows);
    }

    display() {
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let x = j * this.xSize;
                let y = i * this.ySize;
                
                image(this.tex, x, y, this.xSize, this.ySize);
            }
        }
    }
}

class SimpleRect1 {
    constructor(n, texture) {
        this.cellW = width/n;
        this.cellH = this.cellW/2;
        this.tex = texture;
    }

    display() {
        for(let i = 0; i < width; i+=this.cellW) {
            for(let j = 0; j < height; j+=this.cellH+this.cellW) {
                
                push();
                translate(i, j);
                image(this.tex, 0, 0, this.cellW, this.cellH);

                // left
                translate(0, this.cellW+this.cellH);
                rotate(-HALF_PI);
                image(this.tex, 0, 0, this.cellW, this.cellH);
                rotate(HALF_PI);

                // right 
                translate(this.cellW, -this.cellW);
                rotate(HALF_PI)
                image(this.tex, 0, 0, this.cellW, this.cellH);
                pop();
            }
        }
    }
}