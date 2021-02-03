class MyTriangle {
    constructor(p1, p2, p3, lerpRatio) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.lerpRatio = lerpRatio;
        // middle points of triangle
        this.m1 = p5.Vector.lerp(p1, p2, 0.5);
        this.m2 = p5.Vector.lerp(p2, p3, 0.5);
        this.m3 = p5.Vector.lerp(p3, p1, 0.5);

        // console.log(this.m1);
        // console.log(this.m2);
        // console.log(this.m3);
        this.area = this.findArea();
        this.subdivide();
    }

    subdivide() {
        subCount += 1;

        // subdivide this triangle if area above threshold
        if(this.area <= 300) {
            triangles.push(this);
            return;
        }


        // counterclockwise 
        this.findCentroid(this.p1, this.m1, this.m3);
        this.findCentroid(this.p2, this.m2, this.m1);
        this.findCentroid(this.p3, this.m3, this.m2);

    }

    findCentroid(p, m1, m2) {
        let base = p5.Vector.lerp(m1, m2, 0.5);
        let side = p5.Vector.sub(p, m1);
        side.add(m1);
        let centroid = p5.Vector.lerp(base, side, this.lerpRatio);

        // make 3 triangles
        let t1 = new MyTriangle(p, m1, centroid, this.lerpRatio-0.01);
        let t2 = new MyTriangle(p, centroid, m2, this.lerpRatio-0.01);
        let t3 = new MyTriangle(m1, m2, centroid, this.lerpRatio-0.01);

    }

    display() {

        noFill();
        // strokeWeight(0.7);
        stroke(255);
        beginShape();
        vertex(this.p1.x, this.p1.y);
        vertex(this.p2.x, this.p2.y);
        vertex(this.p3.x, this.p3.y);
        endShape(CLOSE);
    }

    findArea() {
        // find the area of the triangle
        let a = p5.Vector.sub(this.p1, this.p2).mag();
        let b = p5.Vector.sub(this.p2, this.p3).mag();
        let c = p5.Vector.sub(this.p3, this.p1).mag();
        let semiper = (a+b+c)/2;
        let area = sqrt(semiper*(semiper-a)*(semiper-b)*(semiper-c));
        return area;
    }
}