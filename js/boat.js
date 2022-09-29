class Boat {
    constructor(x,y,w,h,boatpos,boatAnimation) {
        this.w = w
        this.h = h
        this.boatpos = boatpos
        options = {
            restitution: 1,
            friction:1,
            density:1
        }
        this.animation = boatAnimation;
        this.speed = 0.05;
        this.isBroken = false;
        this.body = Bodies.rectangle(x,y,w,h, options);
        this.boatImg = loadImage("assets/boat.png");
        World.add(world,this.body)
    }
    animate() {
        this.speed = this.speed + 0.05;

    }
    removeBoats(index) {
        this.isBroken = true;
        this.animation = brokenAnimation;
        this.speed = 0.05;
        this.w = 250;
        this.h = 250;
        setTimeout(()=>{
            Matter.World.remove(world, boats[index].body);
            delete boats[index];
        },2000)
    }
    display() {
        var pos = this.body.position;
       // var index = random([0,1,2,3]);
        var index = floor(this.speed % this.animation.length);
        push();
        imageMode(CENTER);
        translate(pos.x,pos.y);
        image(this.animation[index], 0,this.boatpos, this.w,this.h);
        pop();

    }
}