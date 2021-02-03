class LSystem {
    constructor() {
        this.steps = 0;

        this.axiom = "F";
        this.rule = "F+F-F";

        this.startLength = 190.0;
        this.theta = radians(120.0);
        this.reset();
    }

    reset() {
        this.production = this.axiom;
        this.drawLength = this.startLength;
        this.generations = 0;
    }

    render() {
        translate(width/2, height/2);
        this.steps += 5;
        if(this.steps > this.production.length) {
            this.steps = this.production.length;
        }

        for(let i = 0; i < this.steps; i++) {
            let step = this.production.charAt(i);
            if(step == 'F') {
                rect(0, 0, -this.drawLength, -this.drawLength);
                noFill();
                translate(0, -this.drawLength);
            }
            else if(step == '+') {
                rotate(this.theta);
            }
            else if(step == '-') {
                rotate(-this.theta);
            }
            else if(step == '[') {
                push();
            }
            else if(step == ']') {
                pop();
            }
        }
    }

    simulate(gen) {
        while(this.generations < gen) {
            this.production = this.iterate(this.production, this.rule);
        }
    }

    iterate(prod_, rule_) {
        this.drawLength *= 0.6;
        this.generations += 1;
        let newProduction = prod_;
        newProduction = newProduction.replaceAll("F", rule_);
        return newProduction;
    }
}