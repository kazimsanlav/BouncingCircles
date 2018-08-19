let Circles = [];
let MAXCIRCLES = 25;
let cnv, p1, p2, p3, b1, b2, s1, s2;
let colorchange = false;

function setup() {
    //canvas
    cnv = createCanvas(windowWidth, windowHeight - 150);
    background(0);
    cnv.mouseClicked(addCircle);
    //paragraph1
    p1 = createP('Number of balls: ' + Circles.length);
    // button1
    b1 = createButton('Reset');
    b1.style('background-color', 'red');
    createP('');
    // b1.position(150, windowHeight - 40);
    b1.mouseClicked(resetCanvas);
    // button2
    b2 = createButton('Rainbow on/off');
    b2.style('background-color', 'red');
    // b2.position(150, windowHeight - 40);
    b2.mouseClicked(rainbow);
    //paragraph2 and sileder1
    p2 = createP('Radius:');
    // p2.position(310, windowHeight - 55);
    s1 = createSlider(20, 60, 40, 5);
    // s1.position(370, windowHeight - 40);
    //paragraph3 and sileder2
    p3 = createP('Speed:');
    // p3.position(610, windowHeight - 55);
    s2 = createSlider(1, 10, 5, 1);
    // s2.position(670, windowHeight - 40);
}

function resetCanvas() {
    Circles = [];
    background(0);
}

function rainbow() {
    
    colorchange = !colorchange;
    // print(colorchange);
    if(colorchange){
        b2.style('background-color', 'green');
    }
    else{
        b2.style('background-color', 'red');
    }
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

function addCircle() {
    if (colorchange) {
        Circles.push(new Circle(mouseX, mouseY, s1.value(), random(256), random(256), random(256),
            random([1, -1]) * s2.value(),
            random([1, -1]) * s2.value()));
    } else {
        Circles.push(new Circle(mouseX, mouseY, s1.value(), 200, 200, 200,
            random([1, -1]) * s2.value(),
            random([1, -1]) * s2.value()));
    }
}

class Circle {
    // constructor(x, y, radius, vx, vy) {
    //     this.x = x;
    //     this.y = y;
    //     this.radius = radius;
    //     this.r = 200;
    //     this.g = 200;
    //     this.b = 200;
    //     this.vx = vx;
    //     this.vy = vy;
    //     this.col = col;
    // }

    constructor(x, y, radius, r = 200, g = 200, b = 200, vx, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.r = r;
        this.g = g;
        this.b = b;
        this.vx = vx;
        this.vy = vy;
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
        noStroke();
        // stroke(255);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    intersect(other) {
        return (dist(this.x, this.y, other.x, other.y) < (this.radius + other.radius) / 2);
    }

}