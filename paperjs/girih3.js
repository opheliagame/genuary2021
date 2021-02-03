//jshint strict: false

// Change the current style of the project:
project.currentStyle = {
	strokeColor: '#000000',
	fillColor: '#fed904',
	strokeWidth: 1
};

function cos(angle) {
    return Math.cos(angle * Math.PI/180);
}
function sin(angle) {
    return Math.sin(angle * Math.PI/180);
}

let size = new Size(400, 600);
let shapes = [];
// let rect = new Path.Rectangle(view.center - size*0.5, size);
// rect.strokeColor = 'red';

let diag = Math.sqrt(Math.pow(size.width, 2)+Math.pow(size.height, 2));
let dod = new Path.RegularPolygon(view.center, 10, diag/4);
dod.rotate(18);
shapes.push({name: "dod", shape: dod});

let bowtie = new Path();
let dodedge = dod.firstCurve;
let basep = dodedge.point2;
let basev = dodedge.point1 - dodedge.point2;
basev.length = dodedge.length;

bowtie.add(basep);
basep += basev;
bowtie.add(basep);

let n = basev.rotate(180-72);
n.length = basev.length;
bowtie.add(basep+n);

basep += n;
n = basev.rotate(-72-72);
bowtie.add(basep+n);
basep += n;

n = basev.rotate(-72-72-36);
bowtie.add(basep+n);
basep += n;

n = basev.rotate(-72);
bowtie.add(basep+n);
basep += n;

n = basev.rotate(36);
bowtie.add(basep+n);
basep += n;

shapes.push({name: "bowtie", shape: bowtie});
bowtie.rotate(360/5+36, view.center);
for(let i = 1; i < 2; i++) {
    let bowtie1 = bowtie.clone().rotate(i*360/2, view.center);
    shapes.push({name: "bowtie", shape: bowtie1});
}

let elong = new Path();
basep = dodedge.point1;
elong.add(basep);
basep += n;
elong.add(basep);

n = basev.rotate(72);
basep += n;
elong.add(basep);

n = basev.rotate(72+36);
basep += n;
elong.add(basep);

n = basev.rotate(72+36+72+36);
basep += n;
elong.add(basep);

n = basev.rotate(-(180-72));
basep += n;
elong.add(basep);

n = basev.rotate(-72);
basep += n;
elong.add(basep);
elong.rotate(-36);
elong.position += (new Point(20, -62));

shapes.push({name: "elong", shape: elong});
let elongc = elong.clone().translate(0, -elong.position.y+bowtie.position.y);
shapes.push({name: "elong", shape: elongc});
let elonga = elongc.clone().rotate(180, view.center);
shapes.push({name: "elong", shape: elonga});
let elongb = elong.clone().rotate(180, view.center);
shapes.push({name: "elong", shape: elongb});

let tessW = elonga.position.x - elongc.position.x;
let tessH = elong.position.y - elongc.position.y;
// console.log(tessH);

// let vline = new Path.Line(basep, basep + n);
// vline.strokeColor = 'red';
// vline.strokeWidth = 2;
// let vcircle = new Path.Circle(basep, 10);

let shapeGroup = new Group();
// for(let i = 0; i < shapes.length; i++) {
//     shapeGroup.addChild(shapes[i].shape);
// }

for(let i = 0; i < shapes.length; i++) {
    let sh = shapes[i];
    sh.shape.fillColor = '#BDDBD0';
    sh.shape.strokeColor = 'white';
    let patternshape = new Path();
    shapeGroup.addChild(sh.shape);
    for(let j = 0; j < sh.shape.curves.length; j++) {
        let starleaf = new Path({
            strokeWidth: 3,
            // strokeColor: '#0E2E6E',
            strokeColor: 'white',
            // fillColor: '#4174D9'
            fillColor: '#F1A208'
        });
        
        let c = sh.shape.curves[j];
        let clen = (c.point1 - c.point2).length;
        let mid = c.getPointAtTime(0.5);
        let midn = c.getNormalAtTime(0.5)*40;
        let lefthankin = midn.clone().rotate(-36);
        let righthankin = midn.clone().rotate(36);
        
        // dod
        if(sh.name == "dod") {
            let ext = (clen/2) * sin(90) / sin(54);
            let hankinl = (clen/2+ext) * sin(54) / sin(72);
            lefthankin.length = hankinl;
            righthankin.length = hankinl;
        }
        // bowtie or elong
        else if(sh.name == "bowtie") {
            // temp
            let hankinl = 40;
            lefthankin.length = hankinl;
            righthankin.length = hankinl;
        }
        else if(sh.name == "elong") {
            let hankinl = clen/2 * sin(72) / sin(54);
            lefthankin.length = hankinl;
            righthankin.length = hankinl;
        }
        
        // let midc = new Path.Circle(mid, 2);
        // let midl = new Path.Line(mid, mid-midn);
        let line = new Path.Line({
            strokeColor: "white",
            strokeWidth: 1,
            // opacity: 0,
        });
        // let lefthand = new Path.Line(mid, mid-lefthankin);
        // let righthand = new Path.Line(mid, mid-righthankin);
        // lefthand.style = line.style;
        // righthand.style = line.style;
        
        starleaf.add(mid - lefthankin);
        starleaf.add(mid);
        starleaf.add(mid - righthankin);
        starleaf.add(mid - midn);
        starleaf.add(mid - lefthankin);
        shapeGroup.addChild(starleaf);
    
    }
    
}
shapeGroup.visible = false;
// shapeGroup.removeChildren();

for(let i = 0; i < view.size.width*2; i+=tessW) {
    for(let j = 0; j < view.size.height*2; j+=tessH) {
        let g = shapeGroup.clone();
        g.visible = true;
        g.position = new Point(i, j);
    }   
}


