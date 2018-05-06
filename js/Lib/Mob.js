var Mob = 
	function(args){
		Character.call(this, args);
		this.addProperty(args, 'damage', true, null, parseInt);
	};

Mob.prototype = Object.create(Character.prototype);
Mob.prototype.constructor = Mob;

Mob.prototype.attack =
	function(player){
		player.hurt(this.damage, true);
	};