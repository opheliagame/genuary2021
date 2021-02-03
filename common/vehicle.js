class Vehicle {
    constructor(x, y) {
        this.pos = createVector(random(width), random(height));
        this.target = createVector(x, y);
        this.vel = p5.Vector.random2D();
        this.acc = createVector();
        this.r = 8;
        this.maxSpeed = 5;
        this.maxForce = 0.3;
    }

    behaviours() {
        // let seek = this.seek(this.target);
        // this.applyForce(seek);

        let arrive = this.arrive(this.target);
        this.applyForce(arrive);
    }

    arrive(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let dis = desired.mag();
        let speed = this.maxSpeed;
        if(dis < 100) {
            speed = map(dis, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    seek(target) {
        let desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    display() {
        push();
        let rot = noise(this.pos.x*0.002, this.pos.y*0.002, time) * TWO_PI;
        // translate(-width/2, -height/2);
        translate(this.pos.x, this.pos.y);
        rotate(rot);
        stroke(255);
        strokeWeight(4);
        // point(this.pos.x, this.pos.y);
        imageMode(CENTER);
        image(img, 0, 0, img.width/3, img.height/3);
        pop();
    }
}