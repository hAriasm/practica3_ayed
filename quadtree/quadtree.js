class Point {
  constructor(x, y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x; // center
    this.y = y;
    this.w = w; // half width
    this.h = h; // half height
  }

  // verifica si este objeto contiene un objeto Punto
  contains(point) {
    if (
      point.x > this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y > this.y - this.h &&
      point.y <= this.y + this.h
    ) {
      return true;
    }
    return false;
  }

  // verifica si este objeto se intersecta con otro objeto Rectangle
  intersects(range) {
    if (
      (range.x - range.w > this.x - this.w &&
        range.x - range.w <= this.x + this.w) ||
      (range.x + range.w > this.x - this.w &&
        range.x + range.w <= this.x + this.w) ||
      (range.y - range.h > this.y - this.h &&
        range.y - range.h <= this.y + this.h) ||
      (range.y + range.h > this.y - this.h &&
        range.y + range.h <= this.y + this.h)
    ) {
      return true;
    }
  }
}

class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary; // Rectangle
    this.capacity = n; // capacidad maxima de cada cuadrante
    this.points = []; // vector , almacena los puntos a almacenar
    this.divided = false;
  }

  // divide el quadtree en 4 quadtrees
  subdivide() {
    // Algoritmo
    // 1: Crear 4 hijos: qt_northeast , qt_northwest , qt_southeast ,    qt_southwest;

    // 2: Asignar los QuadTree creados a cada hijo
    //this.northeast = qt_northeast;
    //this.northwest = qt_northwest;
    //this.southeast = qt_southeast;
    //this.southwest = qt_southwest;

    // 3.- Hacer: this.divided <- true

    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.northeast = new QuadTree(ne);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h  / 2);
    this.northwest = new QuadTree(nw);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h  / 2);
    this.southeast = new QuadTree(se);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h  / 2);
    this.southwest = new QuadTree(sw);
 
  }

  insert(point) {
    // Algoritmo
    // 1: Si el punto no esta en los limites ( boundary ) del quadtree Return

    // 2: Si ( this.points.length ) < ( this.capacity ),
    // 2.1 Insertamos en el vector this.points
    // Sino
    // 2.2 Dividimos si aun no ha sido dividido
    // 2.3 Insertamos recursivamente en los 4 hijos.
    // this.northeast.insert ( point );
    // this.northwest.insert ( point );
    // this.southeast.insert ( point );
    // this.southwest.insert ( point );
    if(!this.boundary.contains(point)){
      return;
    }

    if(this.points.length < this.capacity){
      this.points.push(point);
    } else {
      if(!this.divided){
        this.subdivide();
        this.divided = true;
      }
      this.northeast.insert(point);
      this.northwest.insert(point);
      this.southeast.insert(point);
      this.southwest.insert(point);
    }
  }

  show() {
    stroke(255);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(
      this.boundary.x,
      this.boundary.y,
      this.boundary.w * 2,
      this.boundary.h * 2
    );
    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }

    for (let p of this.points) {
      strokeWeight(4);
      point(p.x, p.y);
    }
  }

  query(range, found) {}
}
