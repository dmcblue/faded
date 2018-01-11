<?php

?><h1>Test</h1>
<script>
	var Animal = function(){
		//this.type = 'Animal';
		this.abstract = 'yes';
		console.log(this[this.prototype !== undefined ? 'prototype' : '__proto__'], this.type, 'growl', this[this.prototype !== undefined ? 'prototype' : '__proto__'].hasOwnProperty('growl'));
	};
	
	Animal.prototype.eat = function(){
		console.log('eating');
	};
	
	var Cat = function(){
		this.type = 'Cat';
		this.claws = 16;
		Animal.call(this);
	};
	
	Cat.prototype = Object.create(Animal.prototype);
	Cat.prototype.constructor = Cat;
	
	Cat.prototype.type = 'Cat';
	
	var Tiger = function(){
		Cat.call(this);
		this.type = 'Tiger';
		this.claws = 12;
		this.isTiger = 'yes';
		this.abstract = 'no';
	};
	
	Tiger.prototype = Object.create(Cat.prototype);
	Tiger.prototype.constructor = Tiger;
	
	Tiger.prototype.growl = function(){
		console.log('growl');
	};
	
	var SaberTooth = (function(){
		return {
			growl : function(){console.log('hi');}
		};
	})();
	
	var 
		animal = new Animal(),
		cat = new Cat(),
		tiger = new Tiger
	;
	console.log(animal, cat, tiger);
	console.log(cat.hasOwnProperty('abstract'), animal.hasOwnProperty('abstract'));
</script>