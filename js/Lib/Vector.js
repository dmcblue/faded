var Vector = 
	function(){
		Base.call(this, args);
		this.addProperty(args, 'labels', false, null);
		this.addProperty(args, 'values', false, null);
		if(!this.labels){
			this.labels = [];
			for(var i = 0, ilen = this.values.length; i < ilen; i++){
				this.labels.push(i);
			}
		}
		
		for(var i = 0, ilen = this.labels.length; i < ilen; i++){
			if(this.values[this.labels[i]]){
				throw "Missing " + this.getClass() + " value for dimension '"+arg_name+"'";
			}
		}
	};

Vector.prototype = Object.create(Base.prototype);
Vector.prototype.constructor = Vector;

Vector.prototype.add =
	function(vector){
		var values = {};
		for(var i = 0, ilen = this.labels.length; i < ilen; i++){
			var label = this.labels[i];
			values[label] = this.values[label] + vector[label];
		}
		
		return new Vector({labels : this.labels, values : values});
	};

Vector.prototype.subtract =
	function(vector){
		var values = {};
		for(var i = 0, ilen = this.labels.length; i < ilen; i++){
			var label = this.labels[i];
			values[label] = this.values[label] - vector[label];
		}
		
		return new Vector({labels : this.labels, values : values});
	};