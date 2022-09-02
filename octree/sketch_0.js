let gridTopX;
let gridTopY;
var sideLength = 600;

const cubes = [];

function setup() {
  createCanvas(1200, 1200);
  gridTopX = width / 2;
  gridTopY = height / 2;

  strokeWeight(1);

  // sideLength /= 2;
  console.log(sideLength);
  cubes.push(new CubeD(0, 0, 0, sideLength, sideLength, sideLength));
  console.log(sideLength);
  cubes.push(new CubeD(1, 0, 0, sideLength/8, sideLength, sideLength/4));
  console.log(sideLength);
  // cubes.push(new CubeD(1, 0, 0));
  // cubes.push(new CubeD(2, 0, 0));
  // cubes.push(new CubeD(3, 0, 0));

  // sideLength = 250;
  // cubes.push(new CubeD(0, 0, 0));
  // cubes.push(new CubeD(1, 0, 0));
  // cubes.push(new CubeD(1, 1, 0));
  // cubes.push(new CubeD(0, 1, 0));
  
  // while (cubes.length < 30) {
  //   addRandomCube();
  // }
  

  // Sort so the cubes are drawn in the right order
  cubes.sort((a, b) => {
    return a.getSortString().localeCompare(b.getSortString());
  });
}

function keyPressed() {
  if (cubes.length > 1) {
    rCube = cubes.pop();
  }
}

function draw() {
  background(120);

  for (const cube of cubes) {
    cube.draw();
  }
}

function addRandomCube() {

  let cubeAdded = false;

  while (!cubeAdded) {
    const randomCube = random(cubes);

    let newCubeC = randomCube.c;
    let newCubeR = randomCube.r;
    let newCubeZ = randomCube.z;

    const r = random(1);
    if (r < .3) {
      newCubeC++;
    } else if (r < .6) {
      newCubeR++;
    } else {
      newCubeZ++;
    }

    const spotTaken = cubes.some((cube) => {
      return cube.c == newCubeC &&
        cube.r == newCubeR &&
        cube.z == newCubeZ;
    });

    if (!spotTaken) {
      cubes.push(new CubeD(newCubeC, newCubeR, newCubeZ, sideLength, sideLength, sideLength));
      cubeAdded = true;
    }
  }
}

class CubeD {

  constructor(x, y, z, w, h, d) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w; // half width
    this.h = h; // half height
    this.d = d; // half depth
    this.red = random(255);
    this.green = random(255);
    this.blue = random(255);
  }

  draw() {
    const xp = gridTopX + (this.x - this.y) * this.w *
      sqrt(3) / 2;
    const yp = gridTopY + (this.x + this.y) * this.h / 2 -
      (this.d * this.z);

    const points = [];
    for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
      points.push(
        createVector(xp + cos(angle) * this.w,
          yp + sin(angle) * this.h));
    }

    fill(this.red * .75, this.green * .75, this.blue * .75);
    quad(xp, yp,
      points[5].x, points[5].y,
      points[0].x, points[0].y,
      points[1].x, points[1].y);

    fill(this.red * .9, this.green * .9, this.blue * .9);
    quad(xp, yp,
      points[1].x, points[1].y,
      points[2].x, points[2].y,
      points[3].x, points[3].y);

    fill(this.red, this.green, this.blue);
    quad(xp, yp,
      points[3].x, points[3].y,
      points[4].x, points[4].y,
      points[5].x, points[5].y);
  }

  getSortString() {
    return this.z + '.' + this.y + '.' + this.x;
  }
}