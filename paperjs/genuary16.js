//jshint strict: false

// Change the current style of the project:
project.currentStyle = {
// 	strokeColor: 'white',
// 	fillColor: 'white',
// 	strokeWidth: 1
};

substyle = {
    strokeColor: 'black',
    // fillColor: 'black'
};

function cos(angle) {
    return Math.cos(angle * Math.PI/180);
}
function sin(angle) {
    return Math.sin(angle * Math.PI/180);
}
let rect = new Path.Rectangle(new Point(0, 0), 
            new Size(view.size.width, view.size.height));
rect.fillColor = 'black';

let shapes = [];
let size = 200;
recursiveCircle(size);
// console.log(shapes);
// let newshapes = shapes;

let count = 0;
let frames = 60;

// function onFrame() {
//     count++;
//     if(count % frames === 0) {
//         recursiveCircle(size);
//     }
// }

// function onFrame() {
//     // newshapes = shapes.copy();
//     for(let i = 0; i < shapes.length; i++) {
//         let sh = shapes[i];
//         // console.log(sh[0].clone());
//         if(Math.random() < 0.5) {
//             let intersect = sh[0].intersect(sh[1]);
//             // shapes.push(intersect);
//             intersect.style = substyle;
//         }
//         else {
//             let unite = sh[0].unite(sh[1]);
//             // shapes.push(unite);
//             unite.style = substyle;
//         }
//     }
// }

// let gradient = 

function recursiveCircle(size) {
    if(size < 50) {
        return;
    }
    else {
        let c = new Path.Circle(view.center - new Point(0, size/2), size);
        let len = c.segments.length;
        // c.phase = 0;
        // c.tween(
        // {rotation: 180},
        //   {
        //     easing: 'easeInOutCubic',
        //     duration: 2000
        //     }
        // );
        let index = Math.floor(Math.random()*len);
        // console.log(index);
        c.origin = c.segments[index].point;
        c.dest = c.segments[Math.floor(Math.random()*len)].point;
        let b = new Path.Circle(view.center + new Point(0, size/2), size);
        b.origin = b.segments[Math.floor(Math.random()*len)].point;
        b.dest = b.segments[Math.floor(Math.random()*len)].point;
        // shapes.push([c, b]);
        // c.style = substyle;
        
        c.strokeColor = null;
        b.strokeColor = null;
        c.fillColor = {
                    gradient: {
                stops: [['white', 0], ['black', 1]],
                // radial: true
            },
            origin: c.origin,
            destination: c.dest
        }
        b.fillColor = {
                    gradient: {
                stops: [['white', 0], ['black', 1]],
                // radial: true
            },
            origin: b.origin,
            destination: b.dest
        }
        // c.smooth();
        // b.smooth();
        // b.style = substyle;
        // if(Math.random() < 0.5) {
        //     let intersect = c.intersect(b);
        //     // shapes.push(intersect);
        //     // intersect.style = substyle;
        // }
        // else {
        //     let unite = c.unite(b);
        //     // unite.style = project.currentStyle;
        //     // shapes.push(unite);
        //     // unite.style = substyle;
        // }
        recursiveCircle(size-30);
    }
}



