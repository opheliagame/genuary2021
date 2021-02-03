// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data) 
  }).catch((err) => console.log(err));
  return response.json();
}

// fetch("'http://colormind.io/list/'")
// .then(response => response.json())
// .then(data => console.log(data));

// getting colors from colormind 
let colors = [];
var url = "http://colormind.io/api/";
postData(url, {
    	model : "default",
    // 	input : [[44,43,44],[90,83,82],"N","N","N"]
    })
  .then(data => {
      colors = data.result;
    console.log(colors); 
      main();
      
  });

// main();
function main() {
    var radius = 150;
    var hexagon = new Path.RegularPolygon({
    // 	center: view.center,
    	sides: 6,
    	radius: radius,
    // 	strokeColor: 'white',
    // 	fillColor: 'black',
    // 	parent: group
    });
    
    let nhex = 20;
    let colorindices = [];
    for(let k = 0; k < nhex; k++) {
        let cindex = Math.floor(Math.random()*colors.length);
        // let fill = new Color(colors[cindex][0]/255, colors[cindex][1]/255, colors[cindex][2]/255, 0.3);
        colorindices.push(cindex);
    }
    // let circle = new Path.Circle(view.center, 10);
    // circle.fillColor = 'black';
    // console.log(hexagon.curves);
    let xdiff = 2.0 * Math.sin(toRadians(60)) * radius;
    let ydiff = (radius + Math.cos(toRadians(60)) * radius);
    for(var i = -xdiff; i < view.size.width+xdiff; i+=xdiff) {
        for(let j = -ydiff; j < view.size.height+ydiff; j+=ydiff) {
            var copyHexagon = hexagon.clone();
            var x = i;
            var y = j;
            if( (j / ydiff) % 2 == 0) {
                x = x + Math.sin(toRadians(60)) * radius;
            }
            copyHexagon.position = new Point(x, y);
            let cindex = Math.floor(Math.random()*colors.length);
            let fill = new Color(colors[cindex][0]/255, colors[cindex][1]/255, colors[cindex][2]/255, 0.5);
            copyHexagon.fillColor = fill;
            
            let hexCurves = copyHexagon.curves;
            let myshape = new Path({
                // strokeColor: fill,
                // fillColor: 'white'
            });
            
            console.log(hexCurves.length);
            for(let k = 0; k < hexCurves.length; k++) {
                let hexpart = new Path({
                    // strokeColor: fill,
                    // fillColor: 'black'
                });
                
                let c = hexCurves[k];
                let midloc = c.getLocationAtTime(0.5);
                // console.log(mid);
                let midc = new Path.Circle(new Point(midloc.point.x, midloc.point.y), 2);
                // midc.fillColor = 'red';
                // console.log(midc.position);
                let midtan = c.getNormalAtTime(0.5);
                let left = midtan.clone();
                left.angle -= 30;
                left *= radius/2;
                let right = midtan.clone();
                right.angle += 30;
                right *= radius/2;
                
                myshape.add(midc.position);
                myshape.add(midc.position - left);
                
                // hexpart.add(c.point1);
                hexpart.add(midc.position);
                hexpart.add(midc.position-left);
                hexpart.add(copyHexagon.position);
                hexpart.add(midc.position-right);
                hexpart.rotate(60, midc.position);
                // hexpart.add(midc.position-right);
                // hexpart.add(midc.position-left);
                
                // let midcenter = new Path.Circle(midc.position-left, 2);
                // midcenter.fillColor = 'blue';
                
                for(let k = 0; k < nhex/2; k++) {
                    let smallhex = hexpart.clone();
                    smallhex.scale(k*2/nhex);
                    let cindex = colorindices[k+1];
                    // console.log(cindex);
                    let fill = new Color(colors[cindex][0]/255, colors[cindex][1]/255, colors[cindex][2]/255, 0.3);
                    smallhex.fillColor = fill;
                    // colorindices.push(cindex);
                }
            }   
            myshape.add(myshape.firstSegment);
            
            // let nhex = 20;
            for(let k = 0; k < nhex; k++) {
                let smallshape = myshape.clone();
                smallshape.scale(k/nhex);
                // let cindex = Math.floor(Math.random()*colors.length);
                let cindex = colorindices[k];
                // console.log(colors[cindex][0], colors[cindex][1], colors[cindex][2]);
                let fill = new Color(colors[cindex][0]/255, colors[cindex][1]/255, colors[cindex][2]/255, 0.5);
                smallshape.fillColor = fill;
            }
            
        }
    }
}
	
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
	
