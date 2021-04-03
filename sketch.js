let boxes = [];
let timer = 0;
let hue = 300; // oscillate between 270 and 330 (purple and pink)
let hueCounter = 0;
let world, plane, path, sky;

function setup() {
	createCanvas(800, 800).id("canvas");
	world = new World("VRScene");

	plane = new Plane({
		x: 0, y: 1, z: 0,
		width: 10, height: 10,
		asset: "canvas"
	});
	world.add(plane);

	path = new Box({
		x: 0, y: 1, z: 2,
		width: 0.5, height: 0.2, depth: 5,
		red: 100, green: 100, blue: 100
	});
	world.add(path);

	sky = new Sphere({
		x:0, y: 0, z: 0,
		radius: 200,
		red: 0, green: 0, blue: 0
	});
	world.add(sky);

	world.setFlying(true);

	rectMode(CENTER);
	colorMode(HSB, 360, 100, 100);
	strokeWeight(3);
	noFill()
}

function draw() {
	background(0, 0, 0, 0.1);

	if (millis() - timer > 1000) {
		// oscillate the color between 270 and 330 (purple and pink)
		hueCounter += 0.3;
		let newHue = hue + sin(hueCounter) * 30;

		let temp = new Square(width/2, height/2, newHue);
		boxes.push(temp);
		timer = millis();
	}

	for (let i = 0; i < boxes.length; i++) {
		boxes[i].display();
		if (boxes[i].size > width) {
			boxes.splice(i, 1);
			i--;
		}
	}

	plane.updateTexture();

	// setGradient(width/4, height/2, width/2, height/2, color1, color2);
	// erase();
	// triangle(width/2, height/2, width/4, height, width*3/4, height);
	// noErase();

	// fill(0);
	// noStroke();
	// triangle(width/4, height/2, width/2 - 25, height/2, width/4, height);
	// triangle(width*3/4, height/2, width/2 + 25, height/2, width*3/4, height);
}

// function setGradient(x, y, w, h, c1, c2) {
// 	for (let i = y; i <= y + h; i++) {
//     	let inter = map(i, y, y + h, 0, 1);
//     	let c = lerpColor(c1, c2, inter);
//     	stroke(c);
//     	line(x, i, x + w, i);
// 	}
// }


class Square {
	constructor(x, y, hue) {
		this.x = x;
		this.y = y;
		this.size = 0;
		this.angle = 1.0;
		this.hue = hue;
	}

	display() {
		noFill()
		stroke(this.hue, 100, 100);

		push();
		translate(this.x, this.y);
		rotate(this.angle);
		rect(0, 0, this.size, this.size);
		pop();

		this.angle += 0.01;
		this.size += 1;
	}
}