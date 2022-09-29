class Cannon {
    constructor (x,y,w,h,a){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.a = a;
        this.gunImg = loadImage("assets/canon.png");
        this.baseImg = loadImage("assets/cannonBase.png");
    }
    display (){
        if (keyIsDown(RIGHT_ARROW) && this.a < 70) { 
            this.a = this.a + 1;
        //    console.log(this.a);

        }
        if (keyIsDown(LEFT_ARROW) && this.a > -20) { 
            this.a = this.a - 1;

        }
        //code to create the cannon gun
        push()
        translate(this.x,this.y);
        rotate(this.a);
        imageMode(CENTER);
        image(this.gunImg, 0,0,this.w,this.h);
        pop()

        //code to create the cannon base
        image(this.baseImg, 50,10,230,230);
    }
}