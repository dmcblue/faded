var MusicPlayer = 
	function(args){
		if(args === undefined){args = {};}
		Base.call(this, args);
		this.isPlaying = false;
	};

MusicPlayer.prototype = Object.create(Base.prototype);
MusicPlayer.prototype.constructor = MusicPlayer;

MusicPlayer.DEFAULT_VOLUME = 0.1;
MusicPlayer.INTERVAL_END_CHECK = 50;

MusicPlayer.prototype.pause =
	function(){
		this.isPlaying = false;
		this.player.pause();
	};

MusicPlayer.prototype.play =
	function(){
		this.isPlaying = true;
		this.player.play();
	};

MusicPlayer.prototype.reset =
	function(){
		this.seek(0);
	};

MusicPlayer.prototype.seek =
	function(time){
		//this.player.fastSeek(time);
		//fastSeek doesn't work in Chrome
		this.player.currentTime = time;
	};

MusicPlayer.prototype.setSource =
	function(source, loop){
		this.player = new Audio(source);
		this.player.volume = MusicPlayer.DEFAULT_VOLUME;
		this.player.loop = loop === undefined ? false : loop;
	};

MusicPlayer.prototype.toggle =
	function(){
		if(this.isPlaying){
			this.pause();
		}else{
			this.play();
		}
	};