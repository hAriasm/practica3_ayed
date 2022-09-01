let qt;
let count = 0;

function setup() {
  createCanvas(400, 400);

  // centre point and half of width and height
  let boundary = new Rectangle(200, 200, 200, 200);

  // each leave just could have 4 elements
  qt = new QuadTree(boundary, 5);

  console.log(qt);
  for (let i = 0; i < 20; i++) {
    let p = new Point(Math.random() * 400, Math.random() * 400);
    qt.insert(p);
  }
}

function draw() {
  if (mouseIsPressed) {
    let m = new Point(mouseX, mouseY);
    qt.insert(m);
  }
  background(0);
  qt.show();
  stroke(0, 255, 0);
  rectMode(CENTER);
  let range = new Rectangle(mouseX, mouseY, 25, 25);
  rect(range.x, range.y, range.w * 2, range.h * 2);
  let points = [];
  qt.query(range, points);
  for (let p of points) {
    strokeWeight(4);
    point(p.x, p.y)
  }
  //rect(300, 300, 107, 92);
}