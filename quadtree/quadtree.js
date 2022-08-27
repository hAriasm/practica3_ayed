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
        if (point.x > (this.x - w) && point.x < (this.x + w) && point.y > (this.y - h) && point.y < (this.y + h)) {
            return true;
        }
        return false;
    }

    // verifica si este objeto se intersecta con otro objeto Rectangle
    intersects(range) {
        if (point.x == (this.x - w) || point.x == (this.x + w) || point.y == (this.y - h) || point.y == (this.y + h)) {
            return true;
        }
        return false;
    }
}