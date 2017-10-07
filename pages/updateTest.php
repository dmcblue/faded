<?php

?>
<style>
	
</style>
<h1>Update Test</h1>

<div class="faded">
	
</div>
<script>
	var index = 0;
	var Game = function (){this.interval = 5000;};
	Game.prototype.level = function(){
		this.arr = [{selector : index++}, {selector : index++}];
		console.log('LEVEL', this.arr);
		this.updateInterval = 
			setInterval(
				(function(self){return function(){self.update();};})(this), 
				this.interval
			);
	};
	Game.prototype.nextLevel = function(){
		clearInterval(this.updateInterval);
		this.level();
	};
	Game.prototype.update = function(){
		var item = this.arr[1];
		console.log('UPDATE', item.selector, this.arr[1].selector, this.arr);
		this.arr.splice(1, 1);
		this.nextLevel();
	};
	var game = new Game();
	game.level();
</script>