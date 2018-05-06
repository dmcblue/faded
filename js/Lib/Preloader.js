var Preloader = 
	function(args){
		if(args === undefined){
			args = {};
		}
		Base.call(this, args);
		this.items = [];
	};

Preloader.prototype = Object.create(Base.prototype);
Preloader.prototype.constructor = Preloader;

Preloader.TYPE_IMAGE = "image";
Preloader.TYPE_AUDIO = "audio";

Preloader.prototype.add =
	function(type, source){
		this.items.push({type:type, source:source});
	};

// https://perishablepress.com/3-ways-preload-images-css-javascript-ajax/
Preloader.prototype.load =
	function(index){
		//only loads images right now
		var item = this.items[index];
		var media;
		switch(item.type){
			case Preloader.TYPE_IMAGE:
				media = new Image();
				break;
		}
		media.src = item.source;
	};

Preloader.prototype.loadAll =
	function(){
		while(this.items.length){
			this.load(0);
			this.items.shift();
		}
	};

Preloader.prototype.remove =
	function(index){
		this.items.splice(index--, 1);
	};