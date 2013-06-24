Game = {
  
  gameVaulues: {
    money: 50,
    rating: 0,
    health: 100,
    torpedos: 500,

    shipsLeft: 0,
  },

  start: function() {

    Crafty.init(300, 300);
    Crafty.background('green');

    Crafty.scene('Game');


  }
}