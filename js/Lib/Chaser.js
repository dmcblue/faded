var Chaser = 
	function(args){
		Mob.call(this, args);
		this.addProperty(args,'sightFactor', false, 1, parseFloat);
		this.addProperty(args, 'sight', false, Math.round(this.width*this.sightFactor), parseInt);    //in px
	};

Chaser.prototype = Object.create(Mob.prototype);
Chaser.prototype.constructor = Chaser;

Chaser.prototype.getNextMove =
	function(target){
		var 
			direction = Point.HERE,
			distance = this.getPosition().distanceTo(target.getPosition())
		;
		if(distance < this.sight){
			if(distance <= this.radius + target.radius){
				;//console.log(this.radius, player.radius);
			}else{
				direction = this.getPosition().directionOf(target.getPosition());
			}
		}else{
			 direction = this.getRandomMove();
		}
		
		return direction;
	};