let boxes = [];
let timer = 0;
let hue = 325; // oscillate between 310 and 340 (purple and pink)
let hueCounter = 0;
let fontHue = 85; // oscillate between 50 and 120 (yellow and green)
let fontHueCounter = 0;
let maxSize = 600;
let myFont;
let audio;
let clicked = false;

function preload() {
	myFont = loadFont("fonts/Oi-Regular.ttf");
	audio = loadSound("Dragon Fruit Master 2021.m4a");
}

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);

	rectMode(CENTER);
	colorMode(HSB, 360, 100, 100);
	strokeWeight(3);
	noFill();
	textFont(myFont);
	textAlign(CENTER);
	textSize(56);
}

function draw() {
	background(0, 0.1);

	drawSquares(clicked);
	drawRunway();

	fontHueCounter += 0.01;
	let newFontHue = fontHue + sin(fontHueCounter) * 35;
	fill(newFontHue, 80, 100);
	text("Dragon Fruit", width/2, height/4)
}


function mousePressed() {
	clicked = !clicked;
	if (!audio.isPlaying()) {
		audio.play();
	}
	else {
		audio.stop();
	}
}

function drawSquares(audioStarted) {
	if (audioStarted) {
		if (millis() - timer > 857) {
			// oscillate the color between 310 and 340 (purple and pink)
			hueCounter += 0.5;
			let newHue = hue + sin(hueCounter) * 15;

			let temp = new Square(width/2, height/2, newHue);
			boxes.push(temp);
			timer = millis();
		}

		for (let i = 0; i < boxes.length; i++) {
			boxes[i].display();
			if (boxes[i].size > maxSize) {
				boxes.splice(i, 1);
				i--;
			}
	}
	}
}

function drawRunway() {
	fill(0, 0, 70, 0.95);
	noStroke();
	beginShape();
	vertex(width/2 - 150, height);
	vertex(width/2 - 150, height - 30);
	vertex(width/2 - 20, height/2);
	vertex(width/2 + 20, height/2);
	vertex(width/2 + 150, height - 30);
	vertex(width/2 + 150, height);
	endShape();

	fill(0, 0, 50);
	rect(width/2, height - 15, 300, 30);
}


class Square {
	constructor(x, y, hue) {
		this.x = x;
		this.y = y;
		this.size = 0;
		this.angle = 1.0;
		this.hue = hue;
	}

	display() {
		noFill();
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