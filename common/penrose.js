//jshint strict: false

// Change the current style of the project:
project.currentStyle = {
	strokeColor: '#000000',
	fillColor: '#ff0000',
	strokeWidth: 1
};

bigstyle = {
    fillColor: 'white',
    strokeColor: '#4174D9',
    // strokeWidth: 3
};
smallstyle = {
    fillColor: '#0E2E6E',
    strokeColor: '#4174D9',
    // strokeWidth: 3
};

substyle = {
    fillColor: 'black',
    strokeColor: 'white'
};

function cos(angle) {
    return Math.cos(angle * Math.PI/180);
}
function sin(angle) {
    return Math.sin(angle * Math.PI/180);
}

let side = 2500;
// small rhombus triangle
let t = new Path();
let basep = new Point(0, 0);
t.add(basep);
let basev = new Point(side, 0) - basep;
basev.angle = -72;
basep += basev;
t.add(basep);
basev.angle = 72;
basep += basev;
t.add(basep);
t.closed = true;
t.visible = false;

// big rhombus triangle
basev.angle = 0;
basep = new Point(0, 0);
let T = new Path();
T.add(basep);
basev.angle = -36;
basep += basev;
T.add(basep);
basev.angle = 36;
basep += basev;
T.add(basep);
T.closed = true;

let shapes = [];
let newshapes = [];
// shapes.push({type: "big", shape: T});

T.position = view.center;
T.rotate(36);
shapes.push({type: "bigl", shape: T});
let T2 = T.clone().rotate(180);
shapes.push({type: "bigr", shape: T2});

// console.log(t.segments.length);
// subdividesmall(t);
for(let i = 0; i < 6; i++) {
    console.log(shapes.length);
    for(let j = 0; j < shapes.length; j++) {
        let sh = shapes[j];
        if(sh.type == "bigr") {
            subdividebigright(sh.shape, newshapes);
        }
        else if(sh.type == "bigl") {
            subdividebigleft(sh.shape, newshapes);
        }
        else if(sh.type == "smallr") {
            subdividesmallright(sh.shape, newshapes);
        }
        else if(sh.type == "smalll") {
            subdividesmallleft(sh.shape, newshapes);
        }
    }   
    shapes = newshapes;
    newshapes = [];
}

function subdividesmallright(triangle, arr) {
    let a = triangle.firstSegment.point;
    let b = triangle.segments[1].point;
    let c = triangle.lastSegment.point;
    let div = c-a;
    // console.log(div.angle);
    div.angle -= 36;
    let divp = a+div;
    
    // make two small triangles
    let ta = new Path([c, a, divp]);
    let tb = new Path([b, divp, a]);
    ta.closed = true;
    tb.closed = true;
    ta.style = smallstyle;
    tb.style = bigstyle;
    
    arr.push({type: "smallr", shape: ta});
    arr.push({type: "bigr", shape: tb});
    
    // let line = new Path.Line(a, a+div);
    // let circle = new Path.Circle(divp, 10);
}
function subdividesmallleft(triangle, arr) {
    let a = triangle.firstSegment.point;
    let b = triangle.segments[1].point;
    let c = triangle.lastSegment.point;
    let div = c-a;
    // console.log(div.angle);
    div.angle += 36;
    let divp = a+div;
    
    // make two small triangles
    let ta = new Path([c, a, divp]);
    let tb = new Path([a, divp, b]);
    ta.closed = true;
    tb.closed = true;
    ta.style = smallstyle;
    tb.style = bigstyle;
    
    arr.push({type: "smalll", shape: ta});
    arr.push({type: "bigl", shape: tb});
    
    // let line = new Path.Line(a, a+div);
    // let circle = new Path.Circle(divp, 10);
}
function subdividebigleft(triangle, arr) {
    let a = triangle.firstSegment.point;
    let b = triangle.segments[1].point;
    let c = triangle.lastSegment.point;
    
    let vec = c-b;
    let nside = vec.length * sin(36) / sin(108);
    side = nside;
    
    vec.angle += 36;
    vec.length = nside;
    let divp1 = b+vec;
    
    vec *= -1;
    vec.angle -= 36;
    let divp2 = divp1 + vec;
    
    // make smaller triangles
    let ta = new Path([c, divp1, b]);
    let tb = new Path([b, divp1, divp2]);
    let tc = new Path([a, divp2, divp1]);
    ta.closed = true;
    tb.closed = true;
    tc.closed = true;
    ta.style = bigstyle;
    tb.style = smallstyle;
    tc.style = bigstyle;
    
    arr.push({type: "bigl", shape: ta});
    arr.push({type: "smallr", shape: tb});
    arr.push({type: "bigr", shape: tc});
    
    // let line = new Path.Line(divp1, divp1+vec);
    // let circle = new Path.Circle(a, 10);
}
function subdividebigright(triangle, arr) {
    let a = triangle.firstSegment.point;
    let b = triangle.segments[1].point;
    let c = triangle.lastSegment.point;
    
    let vec = a-b;
    let nside = vec.length * sin(36) / sin(108);
    side = nside;
    
    vec.angle -= 36;
    vec.length = nside;
    let divp1 = b+vec;
    
    vec *= -1;
    vec.angle += 36;
    let divp2 = divp1 + vec;
    
    // make smaller triangles
    let ta = new Path([b, divp1, a]);
    let tb = new Path([b, divp1, divp2]);
    let tc = new Path([divp1, divp2, c]);
    ta.closed = true;
    tb.closed = true;
    tc.closed = true;
    ta.style = bigstyle;
    tb.style = smallstyle;
    tc.style = bigstyle;
    
    arr.push({type: "bigr", shape: ta});
    arr.push({type: "smalll", shape: tb});
    arr.push({type: "bigl", shape: tc});
    
    // let line = new Path.Line(divp1, divp1+vec);
    // let circle = new Path.Circle(a, 10);
}

// debug area
// let line = new Path.Line(t.firstSegment.point, 
// t.firstSegment.point + divv);
// let circle = new Path.Circle(basep, 10);