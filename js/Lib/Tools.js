var Tools = 
	{
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
			}
	};