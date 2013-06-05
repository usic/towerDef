Crafty.c('Ship', {
  init: function(){
    this.requires('2D, Canvas, Color, Tween');
    this.color('rgb(255, 255, 255)');
    this.attr({
      w: 2,
      h: 2,
    });
  },

  at: function(path) {
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