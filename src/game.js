Game = {
  
  start: function() {
    
    Crafty.init(300, 300);
    Crafty.background('green');

    //draws Path
    for (var i = 0; i < pathAr.length; i++) {
    	
    	Crafty.e('2D, Canvas, Color')
            .attr({
              x: pathAr[i][0],
              y: pathAr[i][1],
              w: 2,
              h: 2
            })
            .color('rgb(255, 0, 0)');
    };

    //add ships
    setInterval(function(){
    	Crafty.e('Ship').at(pathAr);
    }, 2000);
  }
}