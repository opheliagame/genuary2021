let r = 20*20;
let size = new Size(Math.cos(rad(54))*r, 
                    Math.sin(rad(54))*r);
let adcb = new Path.Rectangle(view.center - size*0.5, size);
adcb.strokeColor = 'red';

let a = adcb.firstSegment.point;
let b = adcb.lastSegment.point;
let c = adcb.segments[2].point;
let d = adcb.segments[1].point;

let ab = b - a;
let dc = c - d;
let ac = c - a;
ab.angle = -54;
// ab.length = Math.sqrt(Math.pow(size.height, 2) + 
//             Math.pow(size.height*Math.sin(rad(45/2))/Math.sin(rad(90-45/2)), 2)); 
// ab.length *= 0.5;
let e = ac*0.5 + a;
let emid = ac*0.25 + a;
let tof = r/4 * Math.sin(rad(18)) / Math.sin(rad(72));
let tog = tof * Math.sin(rad(36)) / Math.sin(rad(54));
ab.length = (emid-a).length - tog;
ab.length = tog;
let g = emid - ab;
ab.length = tof;
ab.angle -= 90;
let f = emid + ab;

let pentagonR = (f-g).length;
let pentagonC = f;
let pent = new Path.RegularPolygon(pentagonC, 5, pentagonR);
pent.strokeColor = 'blue';
pent.rotate(18);

let quarDecR = (a-g).length;
let quarDecC = a;
let quarDec = new Path.RegularPolygon(quarDecC, 10, quarDecR);
quarDec.strokeColor = 'blue';
quarDec.rotate(18);

let penta2 = pent.clone().rotate(18*2, a);
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

for(let i = 0; i < tess.length; i++) {
    let sh = tess[i];
    // console.log(sh.length);
    let curves = sh.curves;
        let myshape = new Path({
            strokeWidth: 1,
            strokeColor: 'black',
            fillColor: '#0E2E6E'
        });
        // console.log(hexCurves.length);
        for(let k = 0; k < curves.length; k++) {
            let c = curves[k];
            let midloc = c.getLocationAtTime(0.5);
            // console.log(mid);
            let midc = new Path.Circle(new Point(midloc.point.x, midloc.point.y), 2);
            midc.fillColor = 'red';
            // console.log(midc.position);
            let midtan = c.getNormalAtTime(0.5);
            let left = midtan.clone();
            left.angle -= 18;
            left.length = (sh.length*0.1);
            let right = midtan.clone();
            right.angle += 18;
            right.length = (sh.length*0.1);
            
            myshape.add(midc.position - right);
            myshape.add(midc.position);
            myshape.add(midc.position - left);
            
            let midcenter = new Path.Circle(left + midc.position, 2);
            midcenter.fillColor = 'pink';
            // let line1 = new Path.Line(midc.position, midc.position + left);
            // line1.strokeColor = 'black';
            // let line2 = new Path.Line(midc.position, midc.position - right);
            // line2.strokeColor = 'black';
        }   
        myshape.add(myshape.firstSegment);
}


// debug area
let line = new Path.Line(emid, emid + ab);
line.strokeColor = 'black';
let point = new Path.Circle(g, 2);
point.fillColor = 'red';
let point1 = new Path.Circle(emid, 2);
point1.fillColor = 'red';
let point2 = new Path.Circle(pentagonC, 2);
point2.fillColor = 'red';

// console.log(tog);

function rad (angle) {
  return angle * (Math.PI / 180);
}
