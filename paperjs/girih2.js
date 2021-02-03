//jshint strict: false

var newLayer = new Layer();
newLayer.activate(); 
let r = 300;
let size = new Size(Math.cos(rad(54))*r, 
                    Math.sin(rad(54))*r);
                    
let debugLine = new Path.Line({strokeColor: 'black'});

let adcb = new Path.Rectangle(view.center - size*0.5, size);
// adcb.strokeColor = 'red';

let a = adcb.firstSegment.point;
let b = adcb.lastSegment.point;
let c = adcb.segments[2].point;
let d = adcb.segments[1].point;

let ab = b - a;
let dc = c - d;
let ac = c - a;
let test = new Path.Line(a, a+ac);
// test.strokeColor = 'black';
// console.log(ab.angle);
ab.angle = -54;
// ab.length = Math.sqrt(Math.pow(size.height, 2) + 
//             Math.pow(size.height*Math.sin(rad(45/2))/Math.sin(rad(90-45/2)), 2)); 
// ab.length *= 0.5;
let e = ac*0.5 + a;
// ac.length = parseFloat(ac.length.toFixed(10));
let emid = ac*0.25 + a;
console.log(ac.length);
console.log((ac/4).length);
let perp = ab.clone();
perp.angle -= (90);
let ac2 = test.clone().rotate(-18, a);
let test2 = new Path.Line(emid, emid+perp);
// test2.strokeColor = 'black';
let tof = r/4 * Math.sin(rad(18.0)) / Math.sin(rad(72.0));
tof = tof-0.7;
let tog = tof * Math.sin(rad(36.0)) / Math.sin(rad(54.0));
tog = tog+0.3;
// ab.length = (emid-a).length - tog;
ab.length = tog;
let g = emid - ab;
ab.length = tof;
ab.angle -= 90;
let f = emid + ab;
let testf = new Path.Circle(f, 2);
// testf.fillColor = 'purple';
let testg = new Path.Circle(g, 2);
// testg.fillColor = 'purple';
let testfg = new Path.Line(f, g);
// testfg.strokeColor = 'black';
console.log(testfg.length)

let pentagonR = (f-g).length;
console.log(pentagonR);
let pentagonC = f;
let pent = new Path.RegularPolygon(pentagonC, 5, pentagonR);
// pent.strokeColor = 'blue';
pent.rotate(18);
// pent.fillColor = '#0E2E6E';
pent.fillColor = 'white';

let quarDecR = (a-g).length;
let quarDecC = a;
let quarDec = new Path.RegularPolygon(quarDecC, 10, quarDecR);
// quarDec.strokeColor = 'blue';
quarDec.rotate(18);
// quarDec.fillColor = '#0E2E6E';
quarDec.fillColor = 'white';

let penta2 = pent.clone().rotate(18.1*2, a);
let penta3 = penta2.clone().rotate(18*2, a);
let pentb1 = pent.clone().translate(new Point(size.width, 0));
pentb1.rotate(-18*2, b);
let pentb2 = pentb1.clone().rotate(-18*2, b);
let pentb3 = pentb2.clone().rotate(-18*2, b);
let pentc1 = pentb1.clone().translate(new Point(0, -size.height));
pentc1.rotate(-18*8, c);
let pentc2 = pentc1.clone().rotate(18*2, c);
let pentc3 = pentc2.clone().rotate(18*2, c);
let pentd1 = pent.clone().translate(new Point(0, -size.height));
pentd1.rotate(18*8, d);
let pentd2 = pentd1.clone().rotate(-18*2, d);
let pentd3 = pentd2.clone().rotate(-18*2, d);

// let pentc3 = pent2.clone().rotate(18*2, a);
let quarDec1 = quarDec.clone();
quarDec1.position = view.center;
let quarDec2 = quarDec.clone().translate(new Point(size.width, 0));
let quarDec3 = quarDec.clone().translate(new Point(0, -size.height));
let quarDec4 = quarDec.clone().translate(new Point(size.width, -size.height));

let tess = [];
tess.push(quarDec, quarDec1, quarDec2, quarDec3, quarDec4);
tess.push(pent, penta2, penta3, pentb1, pentb2, pentb3);
tess.push(pentc1, pentc2, pentc3, pentd1, pentd2, pentd3);
// console.log(tess);

let starleaves = [];
for(let i = 0; i < tess.length; i++) {
    let sh = tess[i];
    // console.log(sh.length);
    let curves = sh.curves;
        let myshape = new Path({
            strokeWidth: 3,
            // strokeColor: '#0E2E6E',
            strokeColor: 'white',
            fillColor: '#0E2E6E'
        });
        // console.log(hexCurves.length);
        for(let k = 0; k < curves.length; k++) {
            let starleaf = new Path({
                strokeWidth: 3,
                // strokeColor: '#0E2E6E',
                strokeColor: 'white',
                fillColor: '#4174D9'
            });


            let c = curves[k];
            let midloc = c.getLocationAtTime(0.5);
            // console.log(mid);
            let midc = new Path.Circle(new Point(midloc.point.x, midloc.point.y), 2);
            // midc.fillColor = 'red';
            // console.log(midc.position);
            let midtan = c.getNormalAtTime(0.5);
            let toc = midtan.clone();
            // console.log(toc);
            let left = midtan.clone();
            left.angle -= 18;
            let right = midtan.clone();
            right.angle += 18;
            
            if(sh.segments.length == 5) {
                toc.length = (sh.length*0.12);
                left.length = (sh.length*0.1);
                right.length = (sh.length*0.1);
            }
            else {
                toc.length = (sh.length*0.1);
                left.length = (sh.length*0.08);
                right.length = (sh.length*0.08);
            }
            
            starleaf.add(midc.position - left);
            starleaf.add(midc.position);
            starleaf.add(midc.position - right);
            starleaf.add(midc.position - toc);
            starleaf.add(midc.position - left);
            starleaves.push(starleaf);
            
            // let midcenter = new Path.Circle(left + midc.position, 2);
            // midcenter.fillColor = 'pink';
            // let line1 = new Path.Line(midc.position, midc.position + left);
            // line1.strokeColor = 'black';
            // let line2 = new Path.Line(midc.position, midc.position - right);
            // line2.strokeColor = 'black';
        }   
        // myshape.add(myshape.firstSegment);
}

let tessGroup = new Group(starleaves);
tessGroup.position = new Point(0, 0);
// newLayer.visible = false;
// var secondLayer = new Layer();
// secondLayer.activate();
// secondLayer.visible = true;
// tessGroup.visible = false;
// console.log(tessGroup.strokeColor);

for(let i = 0; i <= view.size.width+size.width; i+=size.width) {
    for(let j = 0; j <= view.size.height+size.height; j+=size.height) {
        let ng = tessGroup.clone();
        // ng.visible = true;
        ng.position = new Point(i, j);
    }
}

var rect = new Path.Rectangle({
    point: [0, 0],
    size: [view.size.width*2.0, view.size.height*2.0],
    strokeColor: 'white',
    fillColor: 'white',
    selected: true
});
rect.sendToBack();

// debug area
// let line = new Path.Line(emid, emid + ab);
// line.strokeColor = 'black';
// let point = new Path.Circle(g, 2);
// point.fillColor = 'red';
// let point1 = new Path.Circle(emid, 2);
// point1.fillColor = 'red';
// let point2 = new Path.Circle(pentagonC, 2);
// point2.fillColor = 'red';

// console.log(tog);

function rad (angle) {
  return angle * (Math.PI / 180.0);
}