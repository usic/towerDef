Game = {
  
  start: function() {
    
    Crafty.init(300, 300);
    Crafty.background('green');

    //draws Path TO REMOVE!!!!
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

    Crafty.e('Bullet_t').at(pathAr[50][0], pathAr[50][1]);

    Crafty.e('TorpedoButton').at(280, 0);

    //add ships TO CHANGE!!!!!!!!!
    setInterval(function(){
    	Crafty.e('Airship').at(pathAr);
    }, 2000);

  }
}