let ot;
let count = 0;

function setup() {
  createCanvas(800, 800, WEBGL);

  // centre point and half of width and height
  let surface = new Cube(200, 200, 200, 200, 200, 200);

  // each leave just could have 4 elements
  ot = new OcTree(surface, 2);

  console.log(ot);
  for (let i = 0; i < 10; i++) {
    let p = new Point(Math.random() * 400, Math.random() * 400, Math.random() * 400);
    ot.insert(p);
  }
}

function draw() {
  if (mouseIsPressed) {
    let m = new Point(Math.random() * 400, Math.random() * 400, Math.random() * 400);
    ot.insert(m);
  }
  background(0);
  ot.show();
  noFill();
  stroke(255);
  strokeWeight(0.5);
  orbitControl()
  box(400)
  
  //rect(300, 300, 107, 92);
}