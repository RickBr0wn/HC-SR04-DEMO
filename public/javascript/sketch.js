function setup(){
  createCanvas(400, 400);
}

function draw(){
  background(51);
  noFill();
  strokeWeight(2);
  stroke(255);
  ellipse(width/2, height/2, radius*3, radius*3);
}