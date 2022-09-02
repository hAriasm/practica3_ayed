class Point {
  constructor(x, y, z, userData) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.userData = userData;
  }
}

class Cube {
  constructor(x, y, z, w, h,d) {
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
      range.y + range.h < this.y - this.h ||
      range.z - range.d > this.z + this.d ||
      range.z + range.d < this.z - this.d
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
    // Algoritmo
    // 1: Crear 4 hijos: qt_northeast , qt_northwest , qt_southeast ,    qt_southwest;

    // 2: Asignar los OcTree creados a cada hijo
    //this.northeast = qt_northeast;
    //this.northwest = qt_northwest;
    //this.southeast = qt_southeast;
    //this.southwest = qt_southwest;

    // 3.- Hacer: this.divided <- true

    let x = this.surface.x;
    let y = this.surface.y;
    let z = this.surface.z;
    let w = this.surface.w;
    let h = this.surface.h;
    let d = this.surface.d;
    
    let neu = new Cube(x + w / 2, y - h / 2, z + d / 2, w / 2, h / 2, d / 2);
    this.northeastup = new OcTree(neu, this.capacity);
    let ned = new Cube(x + w / 2, y - h / 2, z - d / 2, w / 2, h / 2, d / 2);
    this.northeastdown = new OcTree(ned, this.capacity);

    let nwu = new Cube(x - w / 2, y - h / 2, z + d / 2, w / 2, h / 2, d / 2);
    this.northwestup = new OcTree(nwu, this.capacity);
    let nwd = new Cube(x - w / 2, y - h / 2, z - d / 2, w / 2, h / 2, d / 2);
    this.northwestdown = new OcTree(nwd, this.capacity);

    let seu = new Cube(x + w / 2, y + h / 2, z + d / 2, w / 2, h / 2, d / 2);
    this.southeastup = new OcTree(seu, this.capacity);
    let sed = new Cube(x + w / 2, y + h / 2, z - d / 2, w / 2, h / 2, d / 2);
    this.southeastdown = new OcTree(sed, this.capacity);

    let swu = new Cube(x - w / 2, y + h / 2, z + d / 2, w / 2, h / 2, d / 2);
    this.southwestup = new OcTree(swu, this.capacity);
    let swd = new Cube(x - w / 2, y + h / 2, z - d / 2, w / 2, h / 2, d / 2);
    this.southwestdown = new OcTree(swd, this.capacity);
    
    this.divided = true;
  }

  insert(point) {
    // Algoritmo
    // 1: Si el punto no esta en los limites ( surface ) del octree Return

    // 2: Si ( this.points.length ) < ( this.capacity ),
    // 2.1 Insertamos en el vector this.points
    // Sino
    // 2.2 Dividimos si aun no ha sido dividido
    // 2.3 Insertamos recursivamente en los 4 hijos.
    // this.northeast.insert ( point );
    // this.northwest.insert ( point );
    // this.southeast.insert ( point );
    // this.southwest.insert ( point );
    if (!this.surface.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
     
    else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.northeastup.insert(point)) {
        return true;
      }
      else if (this.northeastdown.insert(point)) {
        return true;

      } 
      else if (this.northwestup.insert(point)) {
        return true;
      } 
      else if (this.northwestdown.insert(point)) {
        return true;
      } 

      else if (this.southeastup.insert(point)) {
        return true;
      } 
      else if (this.southeastdown.insert(point)) {
        return true;
      } 

      else if (this.southwestup.insert(point)) {
        return true;
      }
      else if (this.southwestdown.insert(point)) {
        return true;
      }
    }
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(
      this.surface.x,
      this.surface.y,
      this.surface.z,
      this.surface.w * 2,
      this.surface.h * 2,
      this.surface.d * 2,
    );
    if (this.divided) {
      this.northeastup.show();
      this.northeastdown.show();

      this.northwestup.show();
      this.northwestdown.show();

      this.southeastup.show();
      this.southeastdown.show();

      this.southwestup.show();
      this.southwestdown.show();
    }

    for (let p of this.points) {
      strokeWeight(4);
      point(p.x, p.y, p.z);
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
