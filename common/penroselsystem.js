class PenroseLSystem extends LSystem{
    constructor() {
        super();
        this.steps = 0;
        this.somestep = 0.1;
        this.axiom = "[X]++[X]++[X]++[X]++[X]";
        this.ruleW = "YF++ZF4-XF[-YF4-WF]++";
        this.ruleX = "+YF--ZF[3-WF--XF]+";
        this.ruleY = "-WF++XF[+++YF++ZF]-";
        this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";
        this.startLength = 460.0;
        this.theta = radians(36);
        this.reset();
    }

    reset() {
        this.production = this.axiom;
        this.drawLength = this.startLength;
        this.generations = 0;
    }
        
    render() {
        translate(width/2, height/2);
        let pushes = 0;
        let repeats = 1;
        this.steps += 12;
        if(this.steps > this.production.length) {
            this.steps = this.production.length;
        }

        for(let i = 0; i < this.steps; i++) {
            let step = this.production.charAt(i);
            if(step == 'F') {
                stroke(255, 60);
                for(let j = 0; j < repeats; j++) {
                    line(0, 0, 0, -this.drawLength);
                    noFill();
                    translate(0, -this.drawLength);
                }
                repeats = 1;
            }
            else if(step == '+') {
                for(let j = 0; j < repeats; j++) {
                    rotate(this.theta);
                }
                repeats = 1;
            }
            else if(step == '-') {
                for(let j = 0; j < repeats; j++) {
                    rotate(-this.theta);
                }
                repeats = 1;
            }
            else if(step == '[') {
                pushes += 1;
                push();
            }
            else if(step == ']') {
                pop();
                pushes -= 1;
            }
            else if(step.charCodeAt(0) >= 48 && step.charCodeAt() <= 57) {
                repeats = step.charCodeAt() - 48;
            }
        }

        while(pushes > 0) {
            pop();
            pushes -= 1;
        } 
    }

    iterate(prod_, rule_) {
        let newProduction = "";
        for(let i = 0; i < prod_.length; i++) {
            let step = this.production.charAt(i);
            if(step == 'W') {
                newProduction += this.ruleW;
            }
            else if(step == 'X') {
                newProduction += this.ruleX;
            }
            else if(step == 'Y') {
                newProduction += this.ruleY;
            }
            else if(step == 'Z') {
                newProduction += this.ruleZ;
            }
            else {
                if(step != 'F') {
                    newProduction += step;
                }
            }
        }

        this.drawLength *= 0.5;
        this.generations += 1;
        return newProduction;
    }
}