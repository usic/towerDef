Crafty.c('Ship', {

  init: function(){
    this.requires('2D, Canvas, Color, Collision');
    this.color('rgb(255, 255, 255)');
    this.attr({
      w: 10,
      h: 10,
    });

    this.health = 1000;

    this.onHit('Bullet_t', this.bulletHit);
    this.onHit('Port', this.portHit);
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

  at: function(path){
    this.attr({ x: path[0][0], y: path[0][1]});
    this.go(path, 1);
  },

  go: function(path, n){
    this.x = path[n][0];
    this.y = path[n][1];
    var c = n+1;
    if(c<path.length){
      this.timeout(function(){
        this.go(path, c);
      }, 100);
    }  
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
  },

  at: function(x, y){
    this.attr({ x: x, y: y});
  }
});