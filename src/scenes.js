Crafty.scene("Game", function(){
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

    Crafty.e('Textfield').attr({ x: 280, y: 0, z: 2, }).text(Game.gameVaulues.torpedos).bind('UpdateTorp', function(){this.text(Game.gameVaulues.torpedos);});

    Crafty.e('TorpedoButton').at(280, 0);

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
      console.log(Game.gameVaulues.shipsLeft);
      if (newWave && Game.gameVaulues.shipsLeft<=0 && Game.gameVaulues.health>0) {
        
        console.log('Main if');

        newWave = false;
        
        boatsSd = 0;
        warshipsSd = 0;
        submarinesSd = 0;
        airshipsSd = 0;
        
        switch (curentShip) {
          case 1:
          console.log('boat case');
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
        } else if (Game.gameVaulues.shipsLeft<=0) {

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

  Crafty.trigger('Update');

});
