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
	var tower1;
	var tower2;
	var tower3;
	var visit = false;
	/*
	function moweToPoint(sX,sY,fX,fY,speed){
		partialX = Math.abs(sX - fX)/speed;
		partialY = Math.abs(sY - fY)/speed;
		console.log(partialX); //DELETE
		console.log(partialY); //DELETE
	}*/
	function moweToPointX(sX,fX,speed){
		partialX =  (sX - fX)/speed;
		return partialX;
	}
	function moweToPointY(sY,fY,speed){
		partialY =  (sY - fY)/speed;
		return partialY;
	}
	function deleteVar () {
		 		console.log("delete"); //DELETE
		 		tower1.destroy();
		 		tower2.destroy();
		 		tower3.destroy();
		 	}
	Crafty.scene("main", function() {
		Crafty.background("url('src/bg.png')");
		
		//score display
		var score = Crafty.e("2D, DOM, Text")
			.text("Score: 0")
			.attr({x: Crafty.viewport.width - 300, y: Crafty.viewport.height - 50, w: 200, h:50})
			.css({color: "#fff"});
			
		//tower entity
		var tower = Crafty.e("2D, Canvas, tField, Collision, Mouse")
			.attr({  x: 500, y: 500, score: 0}) //Probable del "Score"
			.bind("Click", function(e) {
				if (visit == true){
					deleteVar ();
					visit = false;
				}else if (visit == false){
					buildTower();
					visit = true;
				}
				
			}).bind("EnterFrame", function() {

			});
			shot();

		//target component
		Crafty.c("target", {   
			init: function() {
				this.origin("center");
				this.attr({
					x: 10, //give it random positions, rotation and speed
					y: 110,
					xspeed: 0, 
					yspeed: 0, 
				}).bind("EnterFrame", function() {
					this.x += this.xspeed;
					this.y += this.yspeed;
				}).collision()
				.onHit("bullet", function(e) {
					//if hit by a bullet increment the score
					tower.score += 5;
					score.text("Score: "+tower.score);
					e[0].obj.destroy(); //destroy the bullet

					this.destroy(); //or take lives
					console.log("Destroy object"); //DELETE
					shot();
				}).bind("Click", function(e) {
				console.log(arguments);
				});
			}
		});

		function shot () {
			x = 10; //x coordinate of taget
			y = 110;//y coordinate of taget
			speed = 50;
			Crafty.e("2D, DOM, Color, bullet")
					.attr({
						x: tower.x, 
						y: tower.y, 
						w: 10, 
						h: 10, 
						xspeed: moweToPointX(tower.x,x,speed), 
						yspeed: moweToPointY(tower.y,y,speed)
					})
					.color("rgb(255, 0, 0)")
					.bind("EnterFrame", function() {

						this.x -= this.xspeed;
						this.y -= this.yspeed;
						//destroy if it goes out of bounds
						if(this._x > Crafty.viewport.width || this._x < 0 || this._y > Crafty.viewport.height || this._y < 0) {
							this.destroy();
							initTarget();
							shot();
							console.log("Destroy bullet"); //DELETE
						}
					});
		}

		function initTarget() {
			Crafty.e("2D, DOM, tower1, Collision, target");
		}
		initTarget();
	
		function buildTower () {
			//moweToPoint(103,200,70,137,5);
			console.log("Build tower function start"); //DELETE
			tower1 = Crafty.e("2D,DOM,tower1,Mouse")
			.attr({ x: tower.x - tower.h, y: tower.y - tower.w})
			.bind("Click", function(e) {
				//Here should be checking of player balance
				tower.removeComponent("tField").addComponent("tower1");
				deleteVar();
				visit = false;

	  			console.log("Change tower"); //DELETE
		  	});
		 	tower2 = Crafty.e("2D,DOM,tower2,Mouse")
		  	.attr({ x: tower.x - tower.h, y: tower.y})
		  	.bind("Click", function(e) {
				//Here should be checking of player balance
				tower.removeComponent("tField").addComponent("tower2");
				deleteVar();
				visit = false;

	  			console.log("Change tower"); //DELETE
		  	});
		  	tower3 = Crafty.e("2D,DOM,tower3,Mouse")
		 	.attr({ x: tower.x - tower.h, y: tower.y + tower.w})
		 	.bind("Click", function(e) {
				//Here should be checking of player balance
				tower.removeComponent("tField").addComponent("tower3");
				deleteVar();
				visit = false;

	  			console.log("Change tower"); //DELETE
		  	});
		}
	});
});