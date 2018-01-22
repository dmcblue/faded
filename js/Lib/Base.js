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
		//console.log(this);
		return this.getPrototype().constructor.name;
	};

Base.prototype.getPrototype = 
	function(){
		return this[this.prototype !== undefined ? 'prototype' : '__proto__'];
	};

Base.prototype.ensure =
	function(methodName, parameters){
		if(!this.getPrototype().hasOwnProperty(methodName)){
			throw this.getClass() 
				+ " missing required method '" + methodName + "'";
		}
		
		parameters = parameters || [];
		
		var functionParameters = 
			Tools.getFunctionParameters(this.getPrototype()[methodName]);
		var valid = parameters.length === functionParameters.length;
		
		for(
			var i = 0, ilen = parameters.length; 
			i < ilen && valid; 
			i++
		){
			valid = valid && parameters[i] === functionParameters[i];
		}
		
		if(!valid){
			throw this.getClass() 
				+ " method '" + methodName + "' "
				+"parameters ('" + functionParameters.join("','") + "') " 
				+ " do not match Interface parameters ('" + parameters.join("','") + "') ";
		}
	};