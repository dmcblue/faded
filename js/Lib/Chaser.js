var Chaser = 
	function(args){
		Mob.call(this, args);
		this.addProperty(args, 'sight', true, null, parseInt);    //in px
	};

Chaser.prototype = Object.create(Mob.prototype);
Chaser.prototype.constructor = Chaser;

Chaser.prototype.getNextMove =
	function(player){
		var 
			direction = Point.HERE,
			distance = this.getPosition().distanceTo(player.getPosition())
		;
		if(distance < this.sight){
			if(distance <= this.radius + player.radius){
				;//console.log(this.radius, player.radius);
			}else{
				direction = this.getPosition().directionOf(player.getPosition());
			}
		}else{
			 direction = this.getRandomMove();
		}
		
		return direction;
	};