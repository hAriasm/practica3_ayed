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
        if (point.x > (this.x - this.w) && point.x < (this.x + this.w) && point.y > (this.y - this.h) && point.y < (this.y + this.h)) {
            return true;
        }
        return false;
    }

    // verifica si este objeto se intersecta con otro objeto Rectangle
    intersects(range) {
        if (range.x == (this.x - this.w) || range.x == (this.x + this.w) || range.y == (this.y - this.h) || range.y == (this.y + this.h)) {
            return true;
        }
        return false;
    }
}