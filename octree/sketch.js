let ot;
let count = 0;
const WIDTH = 400;
function setup() {
  let cnv = createCanvas(WIDTH * 2, WIDTH * 2, WEBGL);
  // centre point and half of width and height
  let surface = new Cube(200, 200, 200, WIDTH / 2, WIDTH / 2, WIDTH / 2);

  // each leave just could have 4 elements
  ot = new OcTree(surface, 2);

  // orientacion ejes x, y, z
  // ot.insert(new Point(50, 1, 1));
  // ot.insert(new Point(1, 100, 1));
  // ot.insert(new Point(1, 1, 25));
  // ot.insert(new Point(100, 1, 1));
  // ot.insert(new Point(1, 200, 1));
  // ot.insert(new Point(1, 1, 200));
  console.log(ot);
  for (let i = 0; i < 6; i++) {
    let p = new Point(Math.random() * WIDTH, Math.random() * WIDTH, Math.random() * WIDTH);
    ot.insert(p);
  }
}

function draw() {

  if (mouseIsPressed) {
    let m = new Point(Math.random() * WIDTH, Math.random() * WIDTH, Math.random() * WIDTH);
    ot.insert(m);
    mouseIsPressed = false;
  }
  background(0);
  ot.show(0, 0, 0);
  ot.showPoints();
  translate();
  noFill();
  stroke(255);
  strokeWeight(1);
  orbitControl()
  // box(400)
  // translate(-100, -100, -100);
  // stroke(255, 0, 0)
  // box(200)
  // stroke(0, 255, 0)
  // translate(+200, +200, +200);
  // box(200)
  // stroke(0, 255, 255)
  // translate(-200, -200, 0);
  // box(200)

  //rect(300, 300, 107, 92);
}