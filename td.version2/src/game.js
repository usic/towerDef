$(document).ready(function() {
	//init Crafty with FPS of 50 and create the canvas element
	Crafty.init();
	Crafty.canvas.init();
	
	//preload the needed assets
	Crafty.load(["src/sprite.png", "src/bg.png"], function() {
		//splice the spritemap
		Crafty.sprite(64, "src/sprite.png", {
			tField: [0,0],
			tower1: [1,0],
			tower2: [2,0],
			tower3: [3,0]
		});
		//start the main scene when loaded
		Crafty.scene("main");
	});
	function moweToPointX(sX,fX,speed){
		partialX =  (sX - fX)/speed;
		return partialX;
	}
	function moweToPointY(sY,fY,speed){
		partialY =  (sY - fY)/speed;
		return partialY;
	}
	Crafty.scene("main", function() {
		Crafty.background("url('src/bg.png')");

		Crafty.c("tower", {
			init: function(){
				this.requires("2D, Canvas, tField, Mouse");
				this.visit = false;
				this.attr({
					w:60,
					h:60
				});
				this.bind("Click", function(){
					if (this.visit == true){
						tower1.destroy();
		 				tower2.destroy();
		 				tower3.destroy();
						this.visit = false;
					}else if (this.visit == false){
						this.buildTower(this.x,this.y);

						this.visit = true;
					}
					});
				this.bind("tFieldDelete", function(){
					this.destroy();
				});
				},
			at: function(x,y,array){
				this.array;
				this.attr({
					x: x,
					y: y
				});
			},
			buildTower: function(x,y) {
			tower1 = Crafty.e("2D,DOM,tower1,Mouse")
			.attr({ x: this.x - this.h, y: this.y - this.w})
			.bind("Click", function(e) {
				//Here should be checking of player balance
				tower1.destroy();
		 		tower2.destroy();
		 		tower3.destroy();
				this.visit = false;
				Crafty.e("towerOne").at(x,y);
				Crafty.trigger("tFieldDelete");
		  	});
		 	tower2 = Crafty.e("2D,DOM,tower2,Mouse")
		  	.attr({ x: this.x - this.h, y: this.y})
		  	.bind("Click", function(e) {
				//Here should be checking of player balance
				tower1.destroy();
		 		tower2.destroy();
		 		tower3.destroy();
				this.visit = false;
				Crafty.e("towerTwo").at(x,y);
				Crafty.trigger("tFieldDelete");
		  	});
		  	tower3 = Crafty.e("2D,DOM,tower3,Mouse")
		 	.attr({ x: this.x - this.h, y: this.y + this.w})
		 	.bind("Click", function(e) {
				//Here should be checking of player balance
				tower1.destroy();
		 		tower2.destroy();
		 		tower3.destroy();
				this.visit = false;
				Crafty.e("towerThree").at(x,y);
				Crafty.trigger("tFieldDelete");
		  		});
			}
		});

		Crafty.c("towerOne", {
			init: function(){
				this.requires("2D, Canvas, tower1");
				this.attr({
					w:60,
					h:60
				});
				this.bind("fire", function(){
					ship = data[0].obj;
					ship.curentPos
				})
			},
			at: function(x,y,array){
				this.array;
				this.attr({
					x: x,
					y: y
				});
			}
			});

		Crafty.c("towerTwo", {
			init: function(){
				this.requires("2D, Canvas, tower2");
				this.attr({
					w:60,
					h:60
				});
			},
			at: function(x,y,array){
				this.array;
				this.attr({
					x: x,
					y: y
				});
			}
		});

		Crafty.c("towerThree", {
			init: function(){
				this.requires("2D, Canvas, tower3");
				this.attr({
					w:40,
					h:40
				});
				},
			at: function(x,y,array){
				this.array;
				this.attr({
					x: x,
					y: y
				});
			}
		});

		Crafty.c("bullet", {
			init: function() {
				this.requires("2D, Canvas, tower3");
				this.attr({
					w:40,
					h:40,
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
					xspeed: moweToPointX(this.x,xf,speed), 
					yspeed: moweToPointY(this.y,yf,speed)
				});
			}
		});

		Crafty.c("bulletOne", {
			strength: 100,   
			init: function() {
				this.requires("bullet");
			},
		});

		Crafty.c("bulletTwo", {
			strength: 200,   
			init: function() {
				this.requires("bullet");
			},
		});

		Crafty.c("bulletThree", {
			strength: 300,   
			init: function() {
				this.requires("bullet");
			},
		});
		Crafty.e("tower").at(100,100);
		Crafty.e("bullet").at(200,200,500,500,50);
	});
});