/*
author: weidi
Description:......
How to Interact: .....
*/

let table;
let myCanvas;
let date = [],
  gsml = [],
  year = [];
let boxSize = 400;
let font1;
let ang = 0;

let s1 = function (sketch) {
  sketch.preload = function () {
    table = sketch.loadTable("assets/dataset.csv", "csv", "header");
    font1 = sketch.loadFont("assets/encode.ttf");
  };
  sketch.setup = function () {
    let canvasW = (sketch.windowWidth * 3) / 5;
    let canvasH = sketch.windowHeight;
    myCanvas = sketch.createCanvas(canvasW, canvasH, sketch.WEBGL);
    myCanvas.position(0, (sketch.windowHeight - canvasH) / 2);
    
    //create camera
    sketch.createEasyCam();
    document.oncontextmenu = () => false;
    
    //get the basic info of the data
    numRows = table.getRowCount();
    numCols = table.getColumnCount();
    //print("numRows "+numRows +" numCols "+numCols)
    
    //load data
    for (let i = 0; i < table.getRowCount(); i++) {
      date[i] = table.getString(i, 0);
      gsml[i] = table.getNum(i, 1);
      year[i] = table.getNum(i, 0);
    }
    
    sketch.cursor(sketch.HAND);
    sketch.textFont(font1);
  };
  sketch.draw = function () {
    sketch.background(240);
    sketch.noFill();
    sketch.stroke("black");
    sketch.strokeWeight(0.5);
    sketch.rotateY(sketch.radians(ang));
    //draw a box
    sketch.box(boxSize);
    //draw vis
    sketch.push();
    ang += 0.05;
    sketch.translate(-sketch.width / 2, -sketch.height / 2, -boxSize / 2);
    sketch.mainGraph();
    sketch.pop();
  };
  /* x-axis - year y-axis - sea Level z-axis - month */
  let nextX, nextY, nextZ;
  sketch.mainGraph = function () {
    let gapx = boxSize / (year[numRows - 1] - year[0]);
    let gapz = boxSize / 11;
    for (let i = 0; i < table.getRowCount(); i++) {
      let x = sketch.width / 2 - boxSize / 2 + gapx * sketch.abs(i / 12);
      let y = sketch.map(
        gsml[i],
        -3.5,
        79.5,
        sketch.height / 2 + boxSize / 2,
        sketch.height / 2 - boxSize / 2
      );
      let z = gapz * (i % 12);
      //datapoints
      let size = sketch.map(gsml[i], -3.5, 79.5, 5, 20);
      sketch.strokeWeight(size);
      sketch.stroke("blue");
      sketch.point(x, y, z);

      //tag
      sketch.push();
      sketch.translate(0, 0, z);
      sketch.textSize(5);
      sketch.fill("black");
      sketch.textAlign(sketch.CENTER);
      sketch.text(gsml[i], x, y + 20);
      sketch.pop();

      //connecting the points
      if (i < numRows - 1) {
        nextX =
          sketch.width / 2 - boxSize / 2 + gapx * sketch.abs((i + 1) / 12);
        nextY = sketch.map(
          gsml[i + 1],
          -3.5,
          79.5,
          sketch.height / 2 + boxSize / 2,
          sketch.height / 2 - boxSize / 2
        );
        nextZ = gapz * ((i + 1) % 12);
      }
      sketch.strokeWeight(1);
      sketch.beginShape();
      if (i % 12 != 11) {
        sketch.vertex(x, y, z);
        sketch.vertex(nextX, nextY, nextZ);
      }
      sketch.endShape();
    }
  };

};

new p5(s1);
