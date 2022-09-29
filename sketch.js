const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
var balls = [];
var boats = [];
var boatAnimation = [];
var boatData;
var boatSheet;
var brokenAnimation = [];
var brokenData;
var brokenSheet;
var waterAnimation = [];
var waterData;
var waterSheet;
var isGameover = false;
var score = 0;
var engine, world,ground;



function preload() {
 backgroundImg = loadImage("assets/background.gif");
 towerImg = loadImage("assets/tower.png");
 boatSheet = loadImage("assets/boat/boat.png");
 boatData = loadJSON("assets/boat/boat.json");
 brokenSheet = loadImage("assets/boat/brokenBoat.png");
 brokenData = loadJSON("assets/boat/brokenBoat.json");
 waterSheet = loadImage("assets/waterSplash/waterSplash.png");
 waterData = loadJSON("assets/waterSplash/waterSplash.json");
 backgroundMusic = loadSound("assets/background_music.mp3");
 cannonExplosion = loadSound("assets/cannon_explosion.mp3");
 cannonWater = loadSound("assets/cannon_water.mp3");
 pirateLaugh = loadSound("assets/pirate_laugh.mp3");
}

function setup() {

  canvas = createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 20;
  cannonGun = new Cannon(175,110,120,120, angle);
 options={
 isStatic:true
 }
 
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 tower = Bodies.rectangle(150,350,160,310, options);
 World.add(world,tower);
// extracting the images one by one from boat.png and storing them in an empty array
var boatFrames = boatData.frames;
for (var a = 0; a < boatFrames.length; a++) {
  var p = boatFrames[a].position;
  var img = boatSheet.get(p.x, p.y, p.w, p.h);
  boatAnimation.push(img);
}

var brokenFrames = brokenData.frames;
for (var a = 0; a < brokenFrames.length; a++) {
  var p = brokenFrames[a].position;
  var img = brokenSheet.get(p.x,p.y,p.w,p.h);
  brokenAnimation.push(img);
}

var waterFrames = waterData.frames;
for (var a = 0; a < waterFrames.length; a++) {
  var p = waterFrames[a].position;
  var img = waterSheet.get(p.x,p.y,p.w,p.h);
  waterAnimation.push(img);
}
console.log(waterAnimation);
 
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  textSize(40);
  text("Score:"+score, 900,60);
  

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.08);

  }
  cannonGun.display()
  rect(ground.position.x, ground.position.y,width*2,1);

  
  for (a = 0; a < balls.length; a++) {
    showCannonBalls(balls[a], a);
    collisionWithBoat(a)
  }

  push();
  imageMode(CENTER);
  image(towerImg, tower.position.x, tower.position.y, 160, 310)
  pop();
  showBoats();
}
function collisionWithBoat(index) {
  for(var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);
      if (collision.collided) {
        Matter.World.remove(world, balls[index].body);
        delete balls[index];
        if (!boats[i].isBroken) {
          score = score + 1;  
        }
        boats[i].removeBoats(i);
       
      }

    }
  }

}
function showCannonBalls(ball,i) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x > width || ball.body.position.y > height - 50) {
      if(!ball.isSink) {
        ball.removeBalls(i);
        cannonWater.play();
        cannonWater.setVolume(0.25);
      }
      //ball.removeBalls(i);
    }
  }
}
function keyPressed() {
  if (keyCode == DOWN_ARROW) {
    cannonball = new CannonBall(cannonGun.x, cannonGun.y);
    balls.push(cannonball);
  }
}
function keyReleased() {
  if (keyCode == DOWN_ARROW) {
    cannonExplosion.play();
    cannonExplosion.setVolume(0.2);
    balls[balls.length - 1].shoot();
  }
}
function showBoats() {
  if (boats.length > 0){
    if (boats[boats.length-1] == undefined || boats[boats.length-1].body.position.x < width - 300) {
      var positions = [-20,-40,-60,-80];
      var a = random(positions);
      boat = new Boat(width,height - 70,150,150, a, boatAnimation);
      boats.push(boat);
    }
    for (var a = 0; a < boats.length; a++) {
      if (boats[a]) {
        Matter.Body.setVelocity(boats[a].body,{x:-2, y:0});
        boats[a].display();
        boats[a].animate();
        var collision = Matter.SAT.collides(tower,boats[a].body);
        if (collision.collided && !boats[a].isBroken) {
          if (!pirateLaugh.isPlaying()) {
            pirateLaugh.play();
            pirateLaugh.setVolume(0.2);
          }
          isGameover = true;
          gameover();
        }
      }
    }
  }
  else {
    boat = new Boat(width,height - 70,150,150, -70, boatAnimation);
    boats.push(boat);
  }
}
function gameover() {
  swal({
    title: "Game Over!!!",
    text: "Thanks For Playing!!!",
    imageUrl: "https://www.kindpng.com/picc/m/81-812148_animated-sad-face-emoji-hd-png-download.png",
    imageSize: "200x200",
    confirmButtonText: "Play Again",
  }, 
    function (isConfirmed) {
      if(isConfirmed) {
        location.reload();
      }
    }
  )
  
}
