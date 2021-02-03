class MyTree {
    constructor(growth_rate, len, texture) {
        this.growth_rate = growth_rate;
        this.len = len;
        this.texture = texture;

        this.points = [];
        this.trees = [];
        for(let i = 0; i < 1; i++) {
            this.trees.push(this.makeBranch(this.len, createVector(0, random(height)), HALF_PI/2));
        }
        this.makeBranchPoints();
        console.log(this.trees);
    }

    grow() {
        this.size += this.growth_rate;
    }

    makeBranchPoints() {
        this.points = [];

        let tree = this.trees[0];
        let next = tree[1];
        let base = tree[0];
        while(next.length == 2) {
            this.points.push(base);
            base = next[0];
            next = next[1];
        }   
    }

    displayTree() {

        // console.log(this.trees.length);
        for(let i = 0; i < this.trees.length; i++) {

            let tree = this.trees[i];
            let next = tree[1];
            let base = tree[0];

            textureMode(NORMAL);
            texture(this.texture);
            // noFill();
            noStroke();
            beginShape(TRIANGLE_STRIP);
            let uv = 0;
            while(next.length == 2) {
                this.points.push(base);
                let stripStart = base;
                let stripEnd = next[0];
                let stripPerp = p5.Vector.sub(stripEnd, stripStart).rotate(HALF_PI).setMag(20);
                
                let stripRes = 250;
                for(let i = 0; i <  stripRes; i++) {
                    let point = p5.Vector.lerp(stripStart, stripEnd, i/stripRes);
                    let pointUp = p5.Vector.add(point, stripPerp);
                    let pointDown = p5.Vector.add(point, p5.Vector.mult(stripPerp, -1));
                    // let uv = map(i, 0, stripRes, 0, 1);

                    uv = fract(uv);
                    vertex(pointUp.x, pointUp.y, uv, 1);
                    vertex(pointDown.x, pointDown.y, uv, 0);
                    uv += stripRes/200000.0;
                    // vertex(pointUp.x, pointUp.y);
                    // vertex(pointDown.x, pointDown.y);
                }
                uv += stripRes/200000.0;
                base = next[0];
                next = next[1];
            }   
            endShape();
            // line(base.x, base.y, next[0].x, next[0].y);
            // circle(next[0].x, next[0].y, 10);
        }
    }

    makeBranch(len, base, rot) {
        if(rot < HALF_PI/10) {
            return [base];
        }
        let randomPick = random(2);
        if(randomPick <= 1.0) {
            // console.log("left!");
            let leaf = createVector(len, 0);
            let ori = base.copy();
            let left = leaf.copy().rotate(-rot);
            ori.add(left);
            
            // this.trees.push(this.makeBranch(len, ori.copy(), rot*0.5));
            return [base, this.makeBranch(len, ori.copy(), rot*0.8)];
        }
        else {
            // console.log("right!");
            let leaf = createVector(len, 0);
            let ori = base.copy();
            let right = leaf.copy().rotate(rot);
            ori.add(right);
            
            return [base, this.makeBranch(len, ori.copy(), rot*0.8)];
        }
    }
}