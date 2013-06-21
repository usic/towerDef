Crafty.c('Ship', {

  init: function(){
    this.requires('2D, Canvas, Color, Collision');
    this.onHit('Bullet_t', this.bulletHit);
    this.onHit('Port', this.portHit);
    this.onHit('Torpedo', this.torpedoHit);
    this.curentPos = 0;
  },

  bulletHit: function(){
    this.health -= 10;
    if (this.health<=0) {
      Game.gameVaulues.money += this.prize;
      Game.gameVaulues.rating += this.prize;
      Crafty.trigger('Update');
      this.destroy();
    };
  },

  portHit: function(){
    console.log('Port Hit');
    Game.gameVaulues.health -= this.health/100;
    Crafty.trigger('Update');
    Crafty.trigger('GameEnd');
    this.destroy();
  },

  torpedoHit: function(data){
    torpedo = data[0].obj;
    torpedo.remove();
    Game.gameVaulues.money += this.prize;
    Game.gameVaulues.rating += this.prize;
    Crafty.trigger('Update');
    this.destroy();
  }, 

  at: function(path){
    this.attr({ x: path[0][0], y: path[0][1]});
    this.go(path, 1);
  },

  go: function(path, n){
    this.x = path[n][0];
    this.y = path[n][1];
    this.curentPos = n+1;
    if(this.curentPos<path.length){
      this.timeout(function(){
        this.go(path, this.curentPos);
      }, 100);
    }  
  } 
});

Crafty.c('Boat', {
  init: function(){
    this.requires('Ship');
    this.color('rgb(255, 255, 255)');
    this.health = 1000;
    this.prize = 100;
    this.attr({
      w: 10,
      h: 10,
    });
  },
});

Crafty.c('Warship',  {
  init: function(){
    this.requires('Ship');
    this.color('rgb(255, 255, 255)');
    this.health = 2000;
    this.prize = 200;
    this.attr({
      w: 20,
      h: 10,
    });
  },
});

Crafty.c('Submarine',  {
  init: function(){
    this.requires('Ship');
    this.color('rgb(255, 255, 255)');
    this.health = 2000;
    this.prize = 300;
    this.attr({
    w: 20,
    h: 10,
    });
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
    this.color('rgb(255, 255, 255)');
    this.health = 4000;
    this.prize = 400;
    this.attr({
    w: 30,
    h: 10,
    });

    this.bind('Remove', this.launchPlane);
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
    this.requires('2D, Canvas, Color, Collision');
    this.color('rgb(0, 0, 128)');
    this.attr({
      w: 2,
      h: 2,
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
    this.requires('2D, Canvas, Color, Mouse');
    this.color('rgb(0, 0, 128)');
    this.attr({
      w: 20,
      h: 20,
    });
    this.bind('Click', function(){
      Crafty.e('Torpedo').at(pathAr);
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