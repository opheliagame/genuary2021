class Rule30 {
    constructor(genSize, rowSize) {
        this.rowSize = rowSize + 1;
        this.genSize = genSize + 1;
        this.gen = [];
        this.currentRow = "";
        this.cellW = width/this.rowSize;
        this.cellH = height/this.genSize;
    }

    init(type) {
        if(type == "default") {
            this.currentRow = "0".repeat(this.rowSize);
            let middleIndex = Math.floor(this.rowSize/2);
            this.currentRow = this.currentRow.substr(0, middleIndex) + "1" + this.currentRow.substr(middleIndex+1);
        }
        else if(type == "random") {
            for(let i = 0; i < this.rowSize; i++) {
                this.currentRow += random(2) < 1.0 ? "1" : "0";
            }
        }
        this.gen.push(this.currentRow);

        // console.log(this.gen);
    }

    update() {
        if(this.gen.length >= this.genSize) {
            return;
        }

        let newRow = "0";
        for(let i = 0; i < this.rowSize-2; i++) {
            let pattern = this.currentRow.slice(i, i+3);

            switch(pattern) {
                case "111":
                    newRow += "0";
                    break;
                case "110":
                    newRow += "0";
                    break;
                case "101":
                    newRow += "0";
                    break;
                case "100":
                    newRow += "1";
                    break;
                case "011":
                    newRow += "1";
                    break;
                case "010":
                    newRow += "1";
                    break;
                case "001":
                    newRow += "1";
                    break;
                case "000":
                    newRow += "0";
                    break;
            }
        }
        newRow += "0";

        this.gen = this.gen.slice(-this.genSize);
        this.currentRow = newRow;
        this.gen.push(this.currentRow);

        // console.log(this.currentRow);
    }

    display() { 
        textSize(this.cellW*2);
        textAlign(CENTER);

        // loop for generations
        for(let i = 0; i < this.gen.length; i++) {
            // inner loop for each row
            let row = this.gen[i];
            for(let j = 0; j < this.rowSize; j++) {
                // each cell in each row
                let cell = row[j];

                push();
                translate(j * this.cellW, i * this.cellH);
                if(cell == "1") {
                    fill(255);
                    let word = "automata";
                    let index = Math.floor(j + noise(i*0.02, j*0.02, time)*10)%word.length;
                    text(word.charAt(index), 0, 0);
                }
                else {
                    fill(0);
                }
                pop();
            }
        }

    }

    marching_squares() {
        // display the grid using marching squares
            
        for(let i = 0; i < this.gen.length-1; i++) {
            // each row
            let currRow = this.gen[i];
            let nextRow = this.gen[i+1];

            // beginShape(TRIANGLE_STRIP);  
            // textureMode(NORMAL);
            // texture(mytex.texture);
            // noFill();
            for(let j = 0; j < this.rowSize-1; j++) {
                // each cell 

                let x = j * this.cellW;
                let y = i * this.cellH;
                let a = createVector(x+this.cellW*0.5, y);
                let b = createVector(x+this.cellW, y+this.cellH*0.5);
                let c = createVector(x+this.cellW*0.5, y+this.cellH);
                let d = createVector(x, y+this.cellH*0.5);

                let state = this.getState(currRow[j], nextRow[j], nextRow[j+1], currRow[j+1]);
                let uv = map(x, 0, width, 0, 1);
                // console.log(uv);

                switch(state) {
                    case 1:
                        this.line(c, d, uv);
                        break;
                    case 2:
                        this.line(b, c, uv);
                        break;
                    case 3:
                        this.line(b, d, uv);
                        break;
                    case 4:
                        this.line(a, b, uv);
                        break;
                    case 5:
                        this.line(a, d, uv);
                        this.line(b, c, uv);
                        break;
                    case 6:
                        this.line(a, c, uv);
                        break;
                    case 7:
                        this.line(a, d, uv);
                        break;
                    case 8:
                        this.line(a, d, uv);
                        break;
                    case 9:
                        this.line(a, c, uv);
                        break;
                    case 10:
                        this.line(a, b, uv);
                        this.line(c, d, uv);
                        break;
                    case 11:
                        this.line(a, b, uv);
                        break;
                    case 12:
                        this.line(b, d, uv);
                        break;
                    case 13:
                        this.line(b, c, uv);
                        break;
                    case 14:
                        this.line(c, d, uv);
                        break;
                }
            }
            // endShape();
        }
    }

    getState(a, b, c, d) {
        return a*8 + b*4 + c*2 + d*1;
    }

    line(a, b, uv) {
        // console.log("display");
        stroke(255);
        strokeWeight(2);
        line(a.x, a.y, b.x, b.y);

        // vertex(a.x, a.y, uv, 0);
        // vertex(a.x, a.y + this.cellH*2, uv, 1);

        // if(a.x < b.x) {
        //     vertex(a.x, a.y, uv, 0);
        //     vertex(b.x, b.y, uv, 1);
        // }
        // else {
        //     vertex(b.x, b.y, uv, 0);
        //     vertex(a.x, a.y, uv, 1);
        // }
    }
}