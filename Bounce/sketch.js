let circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //already present circles in the canvas
  for(let i = 0; i < 500; i++) {
    circles[i] = new Circle(random(0,width), random(0,height),10,i,circles,[255]);
  }
  circles[0].col = [255,0,0,];
  circles[0].diameter = 50;
}


function mousePressed(){
  if(mouseX < width && mouseY < height) {
    let c = new Circle(mouseX,mouseY, 20,circles.length, circles,[255]);
    circles.push(c);
  }
}
function draw() {
  background(0);

  for (let circle of circles) {
    circle.show();
    circle.bounce();
    circle.collide();
  }


class Circle{
  constructor(tempX, tempY,tempDiameter,index,others,col){
    this.diameter = tempDiameter;
    this.others = others;
    this.index = index;
    this.col = col;
    this.theta = random(0, TWO_PI);
    
    this.xspeed = 2*cos(this.theta);
    this.yspeed = 2*sin(this.theta);

    this.mass = pow(this.diameter/2,2);
   
    this.x = tempX;
    this.y = tempY;
    
    if (this.x < (this.diameter/2))  {
      this.x = this.diameter/2;
    } else if (this.x < width && this.x > width - (this.diameter/2)){
      this.x = width - (this.diameter/2);
    } 

    if (this.y < (this.diameter/2))  {
      this.y = this.diameter/2;
    } else if (this.y < height && this.y > height - (this.diameter/2)){
        this.y = height - (this.diameter/2);
    } 

  
  }

  bounce() {
    if (this.x < width && this.y < height){
      if (this.x + (this.diameter / 2) > width || this.x - (this.diameter / 2) < 0) {
       this.xspeed =this.xspeed * -1;
      }
      if (this.y + (this.diameter / 2) > height || this.y - (this.diameter / 2) < 0) {
        this.yspeed = this.yspeed * -1;
      }
      this.x = this.x +this.xspeed;
      this.y = this.y + this.yspeed;
    } 
  }
  

  collide() {
    let i = this.index;
    let ball_array = this.others;
    let a = ball_array[i];
    for (let j = i+1; j < ball_array.length; j++) {
      let b = ball_array[j];
      let xDist = a.x - b.x;
      let yDist = a.y - b.y;
      let distSquared = pow(xDist,2) + pow(yDist,2);
      let numberOfCollision = 0;

      if (distSquared <= pow((a.diameter + b.diameter)/2,2)) {
        let xVelocity = b.xspeed - a.xspeed;
        let yVelocity = b.yspeed - a.yspeed;
        let dotProduct = xDist * xVelocity + yDist * yVelocity;

      //if object moves towards one another
        if (dotProduct > 0){
          let collisionScale = dotProduct / distSquared;
          let xCollision = xDist * collisionScale;
          let yCollision = yDist * collisionScale;

          let combinedMass = a.mass + b.mass;
          let collisionWeight_a = 2*b.mass/combinedMass;
          let collisionWeight_b = 2*a.mass/combinedMass; 
          
          a.xspeed += collisionWeight_a * xCollision;
          a.yspeed += collisionWeight_a * yCollision;
          b.xspeed -= collisionWeight_b * xCollision;
          b.yspeed -= collisionWeight_b * yCollision;
        }
        
        
      }
    }
  }
  
  show() {
    if (this.x < width && this.y < height){
      fill(this.col);
      noStroke();
      ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  }
}
