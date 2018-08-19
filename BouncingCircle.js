let Circles = [];
let MAXCIRCLES = 25;
var cnv, p1;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight - 150);
    background(0);
    p1 = createP('Number of balls: ' + Circles.length);
}


function draw() {

    background(0);

    p1.html('Number of balls: ' + Circles.length);
    // update show every circle

    // splash circles when they touch each other

    try {
        for (var i = Circles.length - 1; i >= 0; i--) {
            Circles[i].col = 200;
            for (var j = Circles.length - 1; j >= 0; j--) {
                if (i != j) {
                    if (Circles[i].intersect(Circles[j])) {
                        Circles[i].col = 0;
                        Circles[i].vx = -Circles[i].vx;
                        Circles[i].vy = -Circles[i].vy;
                        // Circles[j].col = 0;
                        Circles.splice(i, 1);
                        Circles.splice(j, 1);
                        break;
                        // Circles[j].vy = -Circles[j].vy;
                        // Circles[j].vx = -Circles[j].vx;
                        // print('Splashhx');
                    }
                }

            }
        }
    } catch (error) {
        print('i : ' + i + ', j : ' + j);
    }


    for (var i = Circles.length - 1; i >= 0; i--) {

        Circles[i].show();
        Circles[i].update();

    }

    // remove circles when they exceed max number
    if (Circles.length >= MAXCIRCLES) {
        Circles.splice(0, 1);
    }
}

function mousePressed() {
    Circles.push(new Circle(mouseX, mouseY, 50, random([1,-1])*random(3, 5), 
    random([1,-1])*random(3, 5)));
}

class Circle {
    constructor(x, y, radius, vx, vy, col) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.col = col;
    }

    update() {

        if (this.x <= this.radius / 2 || this.x >= (width - this.radius / 2)) {
            this.vx = -this.vx;
        }
        if (this.y <= this.radius / 2 || this.y >= (height - this.radius / 2)) {
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;
    }

    show() {
        strokeWeight(2);
        stroke(255);
        fill(this.col);
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    intersect(other) {
        return (dist(this.x, this.y, other.x, other.y) < (this.radius + other.radius) / 2);
    }

}