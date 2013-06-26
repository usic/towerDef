if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(needle) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === needle) {
                return i;
            }
        }
        return -1;
    };
};

function moweToPointX(sX,fX,speed){
  partialX =  (sX - fX)/speed;
  return partialX;
}

function moweToPointY(sY,fY,speed){
  partialY =  (sY - fY)/speed;
  return partialY;
}

Crafty.c('Ship', {

  init: function(){
    this.requires('2D, Canvas, Collision, Image');
    this.onHit('bullet', this.bulletHit);
    this.onHit('Port', this.portHit);
    this.onHit('Torpedo', this.torpedoHit);
    this.curentPos = 0;
  },

  bulletHit: function(data){
    bullet = data[0].obj;
    bullet.destroy();
    this.health -= bullet.strength;
    if (this.health<=0) {
      Game.gameVaulues.money += this.prize;
      Game.gameVaulues.rating += this.prize;
      Game.gameVaulues.shipsLeft --;
      Crafty.trigger('Update');
      this.destroy();
    };
  },

  portHit: function(){
    Game.gameVaulues.health -= this.health/100;
    Game.gameVaulues.shipsLeft --;
    Crafty.trigger('Update');
    Crafty.trigger('GameEnd');
    this.destroy();
  },

  torpedoHit: function(data){
    torpedo = data[0].obj;
    torpedo.remove();
    Game.gameVaulues.money += this.prize;
    Game.gameVaulues.rating += this.prize;
    Game.gameVaulues.shipsLeft --;
    Crafty.trigger('Update');
    this.destroy();
  }, 

  at: function(path){
    this.attr({ x: path[0][0], y: path[0][1], z: 3});
    this.go(path, 1);
  },

  go: function(path, n){
    if (Game.gameVaulues.firePath.indexOf(n)>-1) {
      Crafty.trigger('fire', this.curentPos);
    };
    this.x = path[n][0];
    this.y = path[n][1];
    this.curentPos = n+1;
    if(this.curentPos<path.length){
      this.timeout(function(){
        this.go(path, this.curentPos);
      }, 150);
    }  
  } 
});

Crafty.c('Boat', {
  init: function(){
    this.requires('Ship');
    this.image("assets/Ship1.png");
    this.health = 1000;
    this.prize = 40;
    
  },
});

Crafty.c('Warship',  {
  init: function(){
    this.requires('Ship');
    this.image("assets/Ship2.png");
    this.health = 2000;
    this.prize = 80;
  },
});

Crafty.c('Submarine',  {
  init: function(){
    this.requires('Ship');
    this.image("assets/Torpeda.png");
    this.health = 2000;
    this.prize = 160;
    this.at = function(path){
      //randop place to deploy 
      var rand = Math.floor(Math.random() * ((path.length-1)/2 + (path.length-1)/10 - (path.length-1)/2 + 1)) + (path.length-1)/2;
      this.attr({ x: path[rand][0], y: path[rand][1]});
      this.go(path, rand + 1);
    };
  },
});

Crafty.c('Airship', {
  init: function(){
    this.requires('Ship');
    this.image("assets/Ship3.png");
    this.health = 4000;
    this.prize = 320;

    //this.bind('Remove', this.launchPlane);
  },

  launchPlane:  function(){
    Crafty.e('Plane').go(pathAr, this.curentPos);
  },
});

Crafty.c('Plane', {
  init: function(){
    this.requires('2D, Canvas, Color, Collision');
    this.onHit('Bullet_t', this.bulletHit);
    this.onHit('Port', this.portHit);
    this.color('rgb(255, 255, 255)');
    this.health = 500;
    this.prize = 75;
    this.attr({
    w: 10,
    h: 10,
    });

    this.curentPos = 0;
  },

  bulletHit: function(){
    this.health -= 10;
    if (this.health<=0) {
      this.destroy();
    };
  },

  portHit: function(){
    console.log('Port Hit');
  }, 

  go: function(path, n){
    this.x = path[n][0];
    this.y = path[n][1];
    this.curentPos = n+1;
    if(this.curentPos<path.length){
      this.timeout(function(){
        this.go(path, this.curentPos);
      }, 50);
    }  
  }
});

Crafty.c('Torpedo', {
  init: function(){
    this.requires('2D, Canvas, Image, Collision');
    this.image("assets/torpedo.png");
    this.attr({
      w: 20,
      h: 5,
    });
  },

  at: function(path){
    this.attr({ x: path[path.length-1][0], y: path[path.length-1][1]});
    this.go(path, path.length-2);
  },

  go: function(path, n){
    this.x = path[n][0];
    this.y = path[n][1];
    this.curentPos = n-1;
    if(this.curentPos>0){
      this.timeout(function(){
        this.go(path, this.curentPos);
      }, 50);
    } else {
      this.destroy();
    }
  }, 

  remove: function(){
    this.destroy();
  }
});

Crafty.c('TorpedoButton', {
  init: function(){
    this.requires('2D, Canvas, Image, Mouse');
    this.image("assets/torpedo.png");
    
    this.bind('Click', function(){
      if(Game.gameVaulues.torpedos > 0){
        Game.gameVaulues.torpedos --;
        Crafty.trigger('UpdateTorp');
        Crafty.e('Torpedo').at(pathAr);
      }
    });
  },

  at: function(x, y){
    this.attr({ x: x, y: y});
  },
});

Crafty.c('Port', {
  init: function(){
    this.requires('2D, Canvas, Collision');
    this.attr({
      w: 40,
      h: 40,
    });
  },

  at: function(x, y){
    this.attr({ x: x, y: y});
  },
});

Crafty.c('Textfield', {
  init: function(){
    this.requires('2D, DOM, Text');
  }
});

Crafty.c('PauseButton', {
  init: function(){
    this.requires('2D, Canvas, Color, Mouse');
    this.color('rgb(255, 0, 0)');
    this.attr({
      w: 20,
      h: 20,
    });
    this.bind('Click', function(){
      Crafty.pause();
    });
  },

  at: function(x, y){
    this.attr({ x: x, y: y});
  },
});

Crafty.c("tower", {
      init: function(){
        this.requires("2D, Canvas, Image, Mouse");
        this.image("assets/EmptyTower.png");
        this.visit = false;
        this.attr({
          w:30,
          h:30
        });
        this.bind("Click", function(){
          if (this.visit == true){
            tower1.destroy();
            tower2.destroy();
            tower3.destroy();
            this.visit = false;
          }else if (this.visit == false){
            this.buildTower(this.x,this.y,this.array);

            this.visit = true;
          }
          });
        this.bind("tFieldDelete", function(data){
          if (data.x==this.x && data.y==this.y) {
            this.destroy();
          };
        });
        },
      at: function(x,y,array){
        this.array = array;
        this.attr({
          x: x,
          y: y,
          z: 3
        });
      },
      buildTower: function(x,y,array) {
      tower1 = Crafty.e("2D, DOM, Image, Mouse")
      .image("assets/Tower1.png")
      .attr({ x: this.x - this.h, y: this.y - this.w})
      .bind("Click", function(e) {
        if(Game.gameVaulues.money>=500){
          Game.gameVaulues.money -= 500;
          Crafty.trigger("Update");
          tower1.destroy();
          tower2.destroy();
          this.visit = false;
          Crafty.e("towerOne").at(x,y,array);
          Crafty.trigger("tFieldDelete", {x:x,y:y});
        }
        });

      tower2 = Crafty.e("2D,DOM,Image,Mouse")
        .image("assets/Tower2.png")
        .attr({ x: this.x - this.h, y: this.y})
        .bind("Click", function(e) {
        if(Game.gameVaulues.money>=1500){
          Game.gameVaulues.money-=1500;
          Crafty.trigger("Update");
          tower1.destroy();
          tower2.destroy();
          this.visit = false;
          Crafty.e("towerTwo").at(x,y,array);
          Crafty.trigger("tFieldDelete");
        }
        });
        /*tower3 = Crafty.e("2D,DOM,tower3,Mouse")
      .attr({ x: this.x - this.h, y: this.y + this.w})
      .bind("Click", function(e) {
        //Here should be checking of player balance
        tower1.destroy();
        tower2.destroy();
        tower3.destroy();
        this.visit = false;
        Crafty.e("towerThree").at(x,y,array);
        Crafty.trigger("tFieldDelete");
          });*/
      }
    });

    Crafty.c("towerOne", {
      init: function(){
        this.requires("2D, Canvas, Image, Mouse");
        this.image("assets/Tower1.png");
        this.visit = false;
        this.bind("Click", function(){
          if (this.visit == true){
            tower2.destroy();
            this.visit = false;
          }else if (this.visit == false){
            this.buildTower(this.x,this.y,this.array);

            this.visit = true;
          }
          });
        this.bind("fire", function(ship){
          if (this.array.indexOf(ship)>-1) {
            Crafty.e('bulletOne').at(this.x, this.y, pathAr[ship][0], pathAr[ship][1], 7);
          };
        });
        this.bind("tower1Delete", function(data){
          if (data.x==this.x && data.y==this.y) {
            this.destroy();
          };
        });
      },
      at: function(x,y,array){
        this.array = array;
        this.attr({
          x: x,
          y: y,
          z:3
        });
      },
      buildTower: function(x,y,array) {
        tower2 = Crafty.e("2D,DOM,Image,Mouse")
        .image("assets/Tower2.png")
        .attr({ x: this.x - this.h, y: this.y})
        .bind("Click", function(e) {
        if(Game.gameVaulues.money>=1000){
          Game.gameVaulues.money-=1000;
          Crafty.trigger("Update");
          tower1.destroy();
          tower2.destroy();
          this.visit = false;
          Crafty.e("towerTwo").at(x,y,array);
          Crafty.trigger("tower1Delete");
        }
        });
      }
      });

    Crafty.c("towerTwo", {
      init: function(){
        this.requires("2D, Canvas, Image");
        this.image("assets/Tower2.png");
        this.bind("fire", function(ship){
          if (this.array.indexOf(ship)>-1) {
            Crafty.e('bulletTwo').at(this.x, this.y, pathAr[ship][0], pathAr[ship][1], 7);
          };
        });
      },
      at: function(x,y,array){
        this.array = array;
        this.attr({
          x: x,
          y: y,
          z:3
        });
      }
    });

    Crafty.c("towerThree", {
      init: function(){
        this.requires("2D, Canvas, tower3");
        this.attr({
          w:40,
          h:40,
          z:3
        });
        },
      at: function(x,y,array){
        this.array = array;
        this.attr({
          x: x,
          y: y
        });
      }
    });

    Crafty.c("bullet", {
      init: function() {
        this.requires("2D, Canvas, Image");
        this.attr({
          w:5,
          h:5,
          z:3
        })
        .bind("EnterFrame", function() {
          this.x -= this.xspeed;
          this.y -= this.yspeed;
          //destroy if it goes out of bounds
          if(this._x > Crafty.viewport.width || this._x < 0 || this._y > Crafty.viewport.height || this._y < 0) {
            this.destroy();
          }
        });
      },
      //x,y: coordinates of tower (start of bulet), xf,yf: coordinates of target (finish point)
      at: function(x,y,xf,yf,speed){
        this.attr({
          x: x,
          y: y,
          xspeed: moweToPointX(x,xf,speed), 
          yspeed: moweToPointY(y,yf,speed)
        });
      }
    });

    Crafty.c("bulletOne", {
      strength: 200,   
      init: function() {
        this.requires("bullet");
        this.image("assets/bullet.png");
      },
    });

    Crafty.c("bulletTwo", {
      strength: 500,   
      init: function() {
        this.requires("bullet");
        this.image("assets/rocket.png");
      },
    });

    Crafty.c("bulletThree", {
      strength: 300,   
      init: function() {
        this.requires("bullet");
      },
    });

// TO REMOVE!!!!!!!!!!!!!!!!
Crafty.c('Bullet_t', {
  init: function(){
    this.requires('2D, Canvas, Color, Collision');
    this.color('rgb(0, 0, 128)');
    this.attr({
      w: 2,
      h: 2,
    });
    this.onHit('Ship', function(){this.destroy();});
  },

  at: function(x, y){
    this.attr({ x: x, y: y});
  }
});