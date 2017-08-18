var Base = function(args){};

Base.prototype.addProperty = 
	function(args,arg_name,required,default_value, convert){
		if(required === undefined){
			required = true;
		}
		
		if(args === undefined){
			console.log(this, arg_name);
		}
		
		if(args[arg_name] !== undefined){
			if(convert !== undefined){
				this[arg_name] = convert(args[arg_name]);
			}else{
				this[arg_name] = args[arg_name];
			}
		}else if(!required){
			this[arg_name] = default_value;
		}else{
			throw "Missing property '"+arg_name+"' for "+this.getClass();
		}
		return this;
   };

Base.prototype.getClass = 
	function(){
		console.log(this);
		return this[this.prototype !== undefined ? 'prototype' : '__proto__'].constructor.name;
	};