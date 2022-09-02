let ot;
let count = 0;

function setup() {
  createCanvas(1200, 1200, WEBGL);

  // centre point and half of width and height
  let surface = new Cube(200, 200, 200, 200, 200, 200);

  // each leave just could have 4 elements
  ot = new OcTree(surface, 2);

  console.log(ot);
  for (let i = 0; i < 10; i++) {
    let p = new Point(
      Math.random() * 400,
      Math.random() * 400,
      Math.random() * 400
    );
    ot.insert(p);
  }
}

function draw() {
  if (mouseIsPressed) {
    let m = new Point(Math.random() * 400,
    Math.random() * 400,
    Math.random() * 400);
    ot.insert(m);
    mouseIsPressed = false;
  }
  background(0);
  ot.show();
  stroke(0, 255, 0);
  rectMode(CENTER);
  let range = new Cube(mouseX, mouseY, mouseX, mouseX);
  box(range.x, range.y, range.z, range.w * 2, range.h * 2, range.d * 2);
  let points = [];
  ot.query(range, points);
  for (let p of points) {
    strokeWeight(4);
    point(p.x, p.y, p.z);
  }
  //rect(300, 300, 107, 92);
}
