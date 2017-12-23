var HealthBar = 
	function(args){
		if(args.classes === undefined){
			args.classes = [];
		}
		args.classes.push('healthbar');
		Item.call(this, args);
		
		var top = document.createElement('div');
		top.className = HealthBar.CLASS_TOP;
		this.element.appendChild(top);
		
		var mid = document.createElement('div');
		mid.className = HealthBar.CLASS_MIDDLE;
		this.element.appendChild(mid);
		
		var bottom = document.createElement('div');
		bottom.className = HealthBar.CLASS_BOTTOM;
		this.element.appendChild(bottom);
		
		this.top = top;
		this.bar = mid;
		
		this.maxBarHeight = this.height - top.offsetHeight - bottom.offsetHeight;
		
		this.counterFlicker = new Counter({turns : Candle.COUNTER_FLICKER});
		this.flicker = Tools.randomBoolean();
	};

HealthBar.prototype = Object.create(Item.prototype);
HealthBar.prototype.constructor = HealthBar;

HealthBar.CLASS_TOP = 'healthbar-top';
HealthBar.CLASS_MIDDLE = 'healthbar-middle';
HealthBar.CLASS_BOTTOM = 'healthbar-bottom';

HealthBar.prototype.set =
	function(health){
		var height = (health/100)*this.maxBarHeight;
		this.bar.style.height = Math.round(height > 0 ? height : 0) + 'px';
	};

HealthBar.prototype.update =
	function(){
		if(this.counterFlicker.updateAndCheck()){
			if(this.flicker){
				Tools.addClass(this.top, 'flicker');
			}else{
				Tools.removeClass(this.top, 'flicker');
			}
			
			this.flicker = !this.flicker;
		}
	};