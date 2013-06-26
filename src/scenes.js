Crafty.scene("Load", function(){
  Crafty.load(["assets/bullet.png", "assets/EmptyTower.png", "assets/rocket.png", "assets/Tower1.png", "assets/Tower2.png", "assets/Ship1.png", "assets/Ship2.png", "assets/Ship3.png", "assets/Torpeda.png", "assets/torpedo.png"], function() {
  //splice the spritemap

  //start the main scene when loaded
  Crafty.scene("Game");
 });
});

Crafty.scene("Game", function(){

  Crafty.background('url("assets/Background.png")');

	/*for (var i = 0; i < pathAr.length; i++) {
    	Crafty.e('2D, Canvas, Color, Text')
            .attr({
              x: pathAr[i][0],
              y: pathAr[i][1],
              w: 2,
              h: 2
            })
            .text(i)
            .color('rgb(255, 0, 0)');
    };*/

    Crafty.e('2D, Canvas, Image').image("assets/Tower1.png").attr({x:400, y:0, z:3});
    Crafty.e('Textfield').attr({ x: 450, y: 0 }).text(" 500");

    Crafty.e('2D, Canvas, Image').image("assets/Tower2.png").attr({x:500, y:0, z:3});
    Crafty.e('Textfield').attr({ x: 550, y: 0 }).text(" 1500");

    Crafty.e('tower').at(20, 160, Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25));
    Crafty.e('tower').at(200, 500, Array(43,44,45,46,47,48,49,50,51,52,53,54,55));
    Crafty.e('tower').at(200, 300, Array(33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55));
    Crafty.e('tower').at(350, 450, Array(63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79));
    Crafty.e('tower').at(600, 400, Array(80,81,82,83,84,85,86,87,88,89,90));

    Crafty.e('Port').at(pathAr[pathAr.length-1][0], pathAr[pathAr.length-1][1]);

    Crafty.e('Textfield').attr({ x: 0, y: 0 }).text("Money "+Game.gameVaulues.money).bind('Update', function(){this.text("Money "+Game.gameVaulues.money);});
    Crafty.e('Textfield').attr({ x: 100, y: 0 }).text("Rating "+Game.gameVaulues.rating).bind('Update', function(){this.text("Rating "+Game.gameVaulues.rating);});
    Crafty.e('Textfield').attr({ x: 200, y: 0 }).text("Health "+Game.gameVaulues.health).bind('Update', function(){this.text("Health "+Game.gameVaulues.health);});

    Crafty.e('Textfield').attr({ x: 280, y: 0, z: 2, }).text(Game.gameVaulues.torpedos).bind('UpdateTorp', function(){this.text(Game.gameVaulues.torpedos);});

    Crafty.e('TorpedoButton').at(290, 0);

    //ships to sent in curent wave
    var boats = 0;
    var warships = 0;
    var submarines = 0;
    var airships = 0;

    /* 
    1 - boat
    2 - warship
    3 - submarine
    4 - airship
    */
    var curentShip = 1;

    var newWave = true;

    //ships already send
    var boatsSd = 0;
    var warshipsSd = 0;
    var submarinesSd = 0;
    var airshipsSd = 0;

    this.addShips = this.bind('Update', function(){

      if (newWave && Game.gameVaulues.shipsLeft<=0 && Game.gameVaulues.health>0) {

        newWave = false;
        
        boatsSd = 0;
        warshipsSd = 0;
        submarinesSd = 0;
        airshipsSd = 0;
        
        switch (curentShip) {
          case 1:
            if (boats==0) {
              boats = 3;
            } else{
              boats = boats*2;
              curentShip = 2;
            };
            break;
          case 2:
            if (warships==0) {
              warships = 1;
              curentShip = 1;
            } else{
              warships = warships*2;
              curentShip = 3;
            };
            break;
          case 3:
            if (submarines==0) {
              submarines = 1;
              curentShip = 1;
            } else{
              submarines = submarines*2;
              curentShip = 4;
            };
            break;
          case 4:
            if (airships==0) {
              airships = 1;
              curentShip = 1;
            } else{
              airships = airships*2;
              curentShip = 1;
            };
            break;
          }
          Crafty.trigger('Update');
        } else if (Game.gameVaulues.shipsLeft<=0 && Game.gameVaulues.health>0) {

          if (boats!=0 && boatsSd!=boats) {

            Game.gameVaulues.shipsLeft += boats;
            var boatsInt = setInterval(function(){
              if (boatsSd<boats) {
                boatsSd ++;
                Crafty.e('Boat').at(pathAr);
              } else{
                if (warships==0) {
                  newWave = true;
                };
                clearInterval(boatsInt);
              };
            }, 2000);

          } else if (warships!=0 && warshipsSd!=warships) {

            Game.gameVaulues.shipsLeft += warships;
            var warshipsInt = setInterval(function(){
              if (warshipsSd<warships) {
                warshipsSd ++;
                Crafty.e('Warship').at(pathAr);
              } else{
                if (submarines==0) {
                  newWave = true;
                };
                clearInterval(warshipsInt);
              };
            }, 2000);

          } else if (submarines!=0 && submarinesSd!=submarines) {

            Game.gameVaulues.shipsLeft += submarines;
            var submarinesInt = setInterval(function(){
              if (submarinesSd<submarines) {
                submarinesSd ++;
                Crafty.e('Submarine').at(pathAr);
              } else{
                if (airships==0) {
                  newWave = true;
                };
                clearInterval(submarinesInt);
              };
            }, 2000);

          } else if (airships!=0 && airshipsSd!=airships) {

            Game.gameVaulues.shipsLeft += airships;
            var airshipsInt = setInterval(function(){
              if (airshipsSd<airships) {
                airshipsSd ++;
                Crafty.e('Airship').at(pathAr);
              } else{
                  newWave = true;
                clearInterval(airshipsInt);
              };
            }, 2000);

          };

        };

    });

  this.endGame = this.bind('GameEnd', function(){
    if (Game.gameVaulues.health<=0) {
      Crafty.stop();
      console.log('Game End');
    };
  });

  Crafty.trigger('Update');

});
