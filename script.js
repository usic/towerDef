window.onload = (function() {
    var WIDTH = 800,
        HEIGHT = 640;
    // Initialize Crafty
    Crafty.init(WIDTH, HEIGHT);
 Crafty.c("Tower", {
            init: function() {
                 
                this.addComponent("2D, Canvas, Color, Mouse, Tween, crate");

                this.w = 32;    // width
                this.h = 32;    // height

                this.bind("Click", function(e) {
                    console.log(arguments);
                    Crafty.e("Tower").makeTower(190, 96, "#F00");
                });
            },
            makeTower: function(x, y, color) {
                this.attr({x: x, y: y}).color(color);
            }
            
        });
  Crafty.c("Bullet", {
            init: function() {
                this.addComponent("2D, DOM, Color, Collision");
                this.bind('EnterFrame', function () {
                    this.x += this.dX;
                    this.y += this.dY;

                    if (this.y < 0) {
                        this.destroy();
                        //setInterval(function(){Crafty.e("Bullet").addBullet(200, 300, 10, 10, 5, -5, "rgb(0,0,255)")},1000);
                        Crafty.e("Bullet").addBullet(200, 300, 10, 10, 4, -5, "rgb(0,0,255)");
                    }
                    if (this.y < 0) {
                        
                    }
                   // while (true) {
                        //setInterval(function(){Crafty.e("Bullet").addBullet(200, 300, 10, 10, 1, -1, "rgb(0,0,255)")},5000);
                        //Crafty.e("Bullet").addBullet(200, 300, 10, 10, 1, -1, "rgb(0,0,255)");
                   // };
                });
            },

            addBullet: function(x, y, w, h, dX, dY, color) {
                this.attr({ x: x, y: y, w: w, h: h, dX: dX, dY: dY}).color(color);
            }
            
        });



    Crafty.e("Tower").makeTower(200, 300, "#F00");
    Crafty.e("Bullet").addBullet(200, 300, 10, 10, 0, -7, "rgb(0,0,255)");
   /* while (true) {
    Crafty.e("Bullet").addBullet(200, 200, 10, 10, 0, -7, "rgb(0,0,255)");
    }*/
    console.log(arguments);
  
});

















    /* Crafty.c("Tower", {
            init: function() {
                this.addComponent("2D, Canvas, Color, Mouse, Tween, crate");

                this.w = 32;    // width
                this.h = 32;    // height
                this.bind("Click", function(e) {
                    console.log(arguments);
                    Crafty.e("Tower").makeTower(190, 96, "#F00");
                });
            },
            makeTower: function(x, y, color) {
                this.attr({x: x, y: y}).color(color);
            }
        });
    Crafty.e("2D, DOM, Color, Collision")
    .color('rgb(0,0,255)')
    .attr({ x: 150, y: 150, w: 10, h: 10, 
            dX: Crafty.math.randomInt(2, 5), 
            dY: Crafty.math.randomInt(2, 5) })
    .bind('EnterFrame', function () {
        //hit floor or roof
        if (this.y <= 0 || this.y >= 150)
            this.dY *= -1;

        if (this.x > 150 || this.x <=10) {
            this.dX *= -1;
            
        }

        this.x += this.dX;
        this.y += this.dY;
    })
    .onHit('Tower', function () {
    this.dX *= -1;
    })
    Crafty.e("Tower").makeTower(60, 96, "#F00");
    var circle = new Crafty.circle(0, 0, 10);
    circle.containsPoint(0, 0); //TRUE
    circle.containsPoint(50, 50); //FALSE
    console.log(arguments);
     Crafty.e("2D, Canvas, Color, Collision, ViewMask").color("red").collision(new Crafty.circle(20, 20, 20)).viewMask()
});
/*