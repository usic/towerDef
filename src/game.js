Game = {
  
  gameVaulues: {
    money: 50,
    rating: 0,
    health: 100,
    torpedos: 5,
  },

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

    Crafty.e('Textfield').attr({ x: 0, y: 0 }).text(Game.gameVaulues.money).bind('Update', function(){this.text(Game.gameVaulues.money);});
    Crafty.e('Textfield').attr({ x: 50, y: 0 }).text(Game.gameVaulues.rating).bind('Update', function(){this.text(Game.gameVaulues.rating);});
    Crafty.e('Textfield').attr({ x: 100, y: 0 }).text(Game.gameVaulues.health).bind('Update', function(){this.text(Game.gameVaulues.health);});

    Crafty.e('TorpedoButton').at(280, 0);

    //add ships TO CHANGE!!!!!!!!!
    setInterval(function(){
    	Crafty.e('Airship').at(pathAr);
    }, 2000);

  }
}