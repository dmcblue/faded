<?php

?><h1>Test</h1>
<button onclick="">Hit</button>
<script>
	var x = 6, y = -6, scale = 5;
	console.log(x%scale, y%scale);
	
	var tests =
		[{
			x : 0, y: 0
		},{
			x : 0, y: 1
		},{
			x : 1, y: 0
		},{
			x : 0, y: -1
		},{
			x : -1, y: 0
		},{
			x : -1, y: 1
		},{
			x : 1, y: -1
		},{
			x : -1, y: -1
		}];
	for(var i = 0, ilen = tests.length; i < ilen; i++){
		var test = tests[i];
		var point = new Lib.Point(test.x, test.y);
		console.log(test.x, test.y, Lib.Movable.pointToDirection(point));
	}
</script>