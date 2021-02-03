
var radius = 50;
var hexagon = new Path.RegularPolygon({
// 	center: view.center,
	sides: 6,
	radius: radius,
	strokeColor: 'white',
	fillColor: 'black',
// 	parent: group
});
// let circle = new Path.Circle(view.center, 10);
// circle.fillColor = 'black';
// console.log(hexagon.curves);

for(var i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
        var copyHexagon = hexagon.clone();
        var x = 2.0 * Math.sin(toRadians(60)) * radius * i;
        var y = (radius + Math.cos(toRadians(60)) * radius) * j;
        if( j % 2 == 0) {
            x = x + Math.sin(toRadians(60)) * radius;
        }
        copyHexagon.position = new Point(x, y);
        
        let hexCurves = copyHexagon.curves;
        let myshape = new Path({
            strokeColor: 'pink',
            fillColor: 'yellow'
        });
        // console.log(hexCurves.length);
        for(let k = 0; k < hexCurves.length; k++) {
            let c = hexCurves[k];
            let midloc = c.getLocationAtTime(0.5);
            // console.log(mid);
            let midc = new Path.Circle(new Point(midloc.point.x, midloc.point.y), 2);
            midc.fillColor = 'red';
            // console.log(midc.position);
            let midtan = c.getNormalAtTime(0.5);
            let left = midtan.clone();
            left.angle -= 30;
            left *= 25;
            let right = midtan.clone();
            right.angle += 30;
            right *= 25;
            
            myshape.add(midc.position);
            myshape.add(midc.position - left);
            
            let midcenter = new Path.Circle(midc.position-right, 2);
            midcenter.fillColor = 'blue';
            // let line1 = new Path.Line(midc.position, midc.position + left);
            // line1.strokeColor = 'black';
            // let line2 = new Path.Line(midc.position, midc.position - right);
            // line2.strokeColor = 'black';
        }   
        myshape.add(myshape.firstSegment);
        
    }
}
	
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
	