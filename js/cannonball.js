class CannonBall {
    constructor (x,y) {
        this.cannonballImg = loadImage("assets/cannonball.png");
        this.animation = [this.cannonballImg];
        this.speed = 0.05;
        this.radius = 30;
        this.body = Bodies.circle(x,y, this.radius, {isStatic : true});
        this.trajectory = [];
        this.isSink = false;
        World.add(world,this.body);
    }
    animate() {
        this.speed = this.speed + 0.05;
    }
    shoot() {
        var newAngle = cannonGun.a - 40;
        newAngle = newAngle * (3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
    //console.log(velocity);
        Body.setStatic(this.body,false);
        Body.setVelocity(this.body,{x: velocity.x * (180/3.14),y: velocity.y * (180/3.14)});

    }
    removeBalls(index) {
        this.isSink = true;
        Body.setVelocity(this.body,{x:0,y:0});
        this.animation = waterAnimation;
        this.radius = 150;
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete balls[index];
        },1000);
    }
    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        // Floor function returns the nearest integer which is just lower than the decimal inside it.
        var index = floor(this.speed % this.animation.length);
        push();
        imageMode(CENTER);
        translate(pos.x,pos.y);
        rotate(angle);
        image(this.animation[index], 0, 0, this.radius, this.radius);
        pop();
        // getting all the x and y positions of the cannonball and storing them in an array and then
        // pushing this array in the main trajectory array.
        if (this.body.velocity.x > 0) {
            var position = [pos.x, pos.y]; 
            this.trajectory.push(position);
            //console.log(this.trajectory);
        }
        // using a for loop to get the x and y position of each cannonball one by one and displaying the image
        // of a tiny cannonball at all those positions.
        // this.trajectory = [[1,2],[3,4],[5,6]]
        for (var a = 0; a < this.trajectory.length; a++) {
            image(this.cannonballImg, this.trajectory[a][0], this.trajectory[a][1], 5,5);
        }
    }
}