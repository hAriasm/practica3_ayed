class Point {
  constructor(x, y, z, userData) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.userData = userData;
  }
}

class Cube {
  constructor(x, y, z, w, h, d) {
    this.x = x; // center
    this.y = y;
    this.z = z;
    this.w = w; // half width
    this.h = h; // half height
    this.d = d; // half depth
  }

  // verifica si este objeto contiene un objeto Punto
  contains(point) {
    return (
      point.x > this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y > this.y - this.h &&
      point.y <= this.y + this.h &&
      point.z > this.z - this.d &&
      point.z <= this.z + this.d
    );
  }

  // verifica si este objeto se intersecta con otro objeto Cube
  intersects(range) {
    return !(
      range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h
    );
  }
}

class OcTree {
  constructor(surface, n) {
    this.surface = surface; // Cubo
    this.capacity = n; // capacidad maxima de cada cuadrante
    this.points = []; // vector , almacena los puntos a almacenar
    this.divided = false;
  }

  // divide el octree en 8 octrees
  subdivide() {
    let x = this.surface.x;
    let y = this.surface.y;
    let z = this.surface.z;
    let w = this.surface.w;
    let h = this.surface.h;
    let d = this.surface.d;

    let neu = new Cube(x + w / 2, y - h / 2, z - d / 2, w / 2, h / 2, d / 2);
    this.northeastup = new OcTree(neu, this.capacity);
    let ned = new Cube(x + w / 2, y + h / 2, z - d / 2, w / 2, h / 2, d / 2);
    this.northeastdown = new OcTree(ned, this.capacity);

    let nwu = new Cube(x - w / 2, y - h / 2, z - d / 2, w / 2, h / 2, d / 2);
    this.northwestup = new OcTree(nwu, this.capacity);
    let nwd = new Cube(x - w / 2, y + h / 2, z - d / 2, w / 2, h / 2, d / 2);
    this.northwestdown = new OcTree(nwd, this.capacity);

    let seu = new Cube(x + w / 2, y - h / 2, z + d / 2, w / 2, h / 2, d / 2);
    this.southeastup = new OcTree(seu, this.capacity);
    let sed = new Cube(x + w / 2, y + h / 2, z + d / 2, w / 2, h / 2, d / 2);
    this.southeastdown = new OcTree(sed, this.capacity);

    let swu = new Cube(x - w / 2, y - h / 2, z + d / 2, w / 2, h / 2, d / 2);
    this.southwestup = new OcTree(swu, this.capacity);
    let swd = new Cube(x - w / 2, y + h / 2, z + d / 2, w / 2, h / 2, d / 2);
    this.southwestdown = new OcTree(swd, this.capacity);

    this.divided = true;
  }

  insert(point) {
    if (!this.surface.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.northeastup.insert(point)) {
        return true;
      } else if (this.northeastdown.insert(point)) {
        return true;
      } else if (this.northwestup.insert(point)) {
        return true;
      } else if (this.northwestdown.insert(point)) {
        return true;
      } else if (this.southeastup.insert(point)) {
        return true;
      } else if (this.southeastdown.insert(point)) {
        return true;
      } else if (this.southwestup.insert(point)) {
        return true;
      } else if (this.southwestdown.insert(point)) {
        return true;
      }
    }
  }

  show(tx, ty, tz) {
    stroke(0, 255, 255);

    strokeWeight(.75);
    noFill();

    box(2 * this.surface.w, 2 * this.surface.h, 2 * this.surface.d);

    if (this.divided) {
      translate(-this.surface.w / 2, -this.surface.h / 2, -this.surface.d / 2);
      this.northwestup.show(-1, -1, -1);
      translate(this.surface.w / 2, this.surface.h / 2, this.surface.d / 2);

      translate(this.surface.w / 2, -this.surface.h / 2, -this.surface.d / 2);
      this.northeastup.show(2, 0, 0);
      translate(-this.surface.w / 2, this.surface.h / 2, this.surface.d / 2);

      translate(this.surface.w / 2, this.surface.h / 2, -this.surface.d / 2);
      this.northeastdown.show(0, 0, -2);
      translate(-this.surface.w / 2, -this.surface.h / 2, this.surface.d / 2);

      translate(-this.surface.w / 2, this.surface.h / 2, -this.surface.d / 2);
      this.northwestdown.show(-2, 0, 0);
      translate(this.surface.w / 2, -this.surface.h / 2, this.surface.d / 2);

      translate(this.surface.w / 2, -this.surface.h / 2, this.surface.d / 2);
      this.southeastup.show(0, 0, 2);
      translate(-this.surface.w / 2, this.surface.h / 2, -this.surface.d / 2);

      translate(-this.surface.w / 2, -this.surface.h / 2, this.surface.d / 2);
      this.southwestup.show(-2, 0, 0);
      translate(this.surface.w / 2, this.surface.h / 2, -this.surface.d / 2);

      translate(-this.surface.w / 2, this.surface.h / 2, this.surface.d / 2);
      this.southwestdown.show(0, 2, 0);
      translate(this.surface.w / 2, -this.surface.h / 2, -this.surface.d / 2);

      translate(this.surface.w / 2, this.surface.h / 2, this.surface.d / 2);
      this.southeastdown.show(2, 0, 0);
      translate(-this.surface.w / 2, -this.surface.h / 2, -this.surface.d / 2);
    }
  }

  showPoints(showLabels) {
    stroke(255);
    strokeWeight(7);

    if (this.divided) {
      this.northwestup.showPoints(showLabels);
      this.northeastup.showPoints(showLabels);
      this.northeastdown.showPoints(showLabels);
      this.northwestdown.showPoints(showLabels);
      this.southeastup.showPoints(showLabels);
      this.southwestup.showPoints(showLabels);
      this.southwestdown.showPoints(showLabels);
      this.southeastdown.showPoints(showLabels);
    }

    for (let p of this.points) {
      point(p.x - 200, p.y - 200, p.z - 200);

      if (showLabels) {
        textSize(12);
        fill(255, 255, 153);
        translate(0, 0, p.z - 200);
        text("(" + p.x + ", " + p.y + ", " + p.z + ")", p.x - 200, p.y - 200);
        translate(0, 0, 200 - p.z);
      }
    }
  }

  query(range, found) {
    if (!found) {
      found = [];
    }
    if (!this.surface.intersects(range)) {
      return;
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
      if (this.divided) {
        this.northwestup.query(range, found);
        this.northwestdown.query(range, found);

        this.northeastup.query(range, found);
        this.northeastdown.query(range, found);

        this.southwestup.query(range, found);
        this.southwestdown.query(range, found);

        this.southeastup.query(range, found);
        this.southeastdown.query(range, found);
      }
    }
    return found;
  }
}
