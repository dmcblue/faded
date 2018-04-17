var Tools = 
	{
		addClass :
			function(element, className){
				var classes = element.className.split(' ');
				for(var i = 0, ilen = classes.length; i < ilen; i++){
					if(classes[i] === className){
						return;
					}
				}

				classes.push(className);
				element.className = classes.join(' ');
			},
		clonePlane :
			function(array){
				var clonedArray = [];
				for(var i = 0, ilen = array.length; i < ilen; i++){
					var row = array[i];
					var clonedRow = [];
					for(var j = 0, jlen = row.length; j < jlen; j++){
						clonedRow[j] = row[j];
					}
					clonedArray.push(clonedRow);
				}
				return clonedArray;
			},
		getFunctionParameters :
			function(func){
				//https://davidwalsh.name/javascript-arguments
				// First match everything inside the function argument parens.
				var args = func.toString().match(/function\s*.*?\(([^)]*)\)/);
				if(args === null){
					return [];
				}
				args = args[1];
				// Split the arguments string into an array comma delimited.
				return args.split(',').map(function(arg) {
				  // Ensure no inline comments are parsed and trim the whitespace.
				  return arg.replace(/\/\*.*\*\//, '').trim();
				}).filter(function(arg) {
				  // Ensure no undefined values are added.
				  return arg;
				});
			},
		initPlane :
			function(width, height, initialValue){
				if(initialValue === undefined){
					initialValue = 0;
				}
				var array = [];
				for(var i = 0, ilen = width; i < ilen; i++){
					var row = [];
					for(var j = 0, jlen = height; j < jlen; j++){
						row[j] = initialValue;
					}
					array.push(row);
				}
				return array;
			},
		inRange :
			function(min, val, max){
				return Math.max(Math.min(val, max), min);
			},
		isInRange :
			function(min, val, max){
				return min <= val && val <= max;
			},
		randomBoolean :
			//http://jsfiddle.net/Ronny/Ud5vT/
			function(){
				return !(Math.random()+.5|0); // (shortcut for Math.round)
			},
		randomInteger :
			//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
			function(min, max, inclusive){
				if(inclusive === undefined){inclusive = false;}
				min = Math.ceil(min);
				max = Math.floor(max);
				var added = inclusive ? 1 : 0;
				return Math.floor(Math.random() * (max - min + added)) + min;
			},
		randomItem :
			function(arr){
				return arr[Tools.randomInteger(0, arr.length, false)];
			},
		removeClass :
			function(element, className){
				var index = -1;
				var classes = 
					element.className.length 
						? element.className.split(' ') 
						: []
					;
				for(var i = 0, ilen = classes.length; i < ilen; i++){
					if(classes[i] === className){
						index = i;
						break;
					}
				}

				if(index !== -1){
					classes.splice(i, 1);
					element.className = classes.join(' ');
				}
			},
		transposePlane :
			function(array){
				console.log(array);
				var clonedArray = Tools.initPlane(array[0].length, array.length);
				for(var i = 0, ilen = array.length; i < ilen; i++){
					for(var j = 0, jlen = array[i].length; j < jlen; j++){
						clonedArray[j][i] = array[i][j];
					}
				}
				return clonedArray;
			}
	};