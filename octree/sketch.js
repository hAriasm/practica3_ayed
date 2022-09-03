let ot;
let count = 0;
let showLabels = false;
const WIDTH = 400;

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Bold.otf');
}

function setup() {
  let cnv = createCanvas(WIDTH * 2, WIDTH * 2, WEBGL);
  textFont(font);

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
  for (let i = 0; i < 6 ; i++) {
    let p = new Point(Number(Math.random() * WIDTH).toFixed(0), Number(Math.random() * WIDTH).toFixed(0), Number(Math.random() * WIDTH).toFixed(0));
    ot.insert(p);
  }
}

function draw() {

  if (mouseIsPressed) {
    let m = new Point(Number(Math.random() * WIDTH).toFixed(0), Number(Math.random() * WIDTH).toFixed(0), Number(Math.random() * WIDTH).toFixed(0));
    ot.insert(m);
    mouseIsPressed = false;
  }
  background(0);
  ot.show(0, 0, 0);
  ot.showPoints(showLabels);
  translate();
  noFill();
  stroke(255);
  strokeWeight(1);
  orbitControl()
}