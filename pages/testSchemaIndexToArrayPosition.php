<?php

?><h1>Test</h1>
<button onclick="">Hit</button>
<script>
	var schema = 'abcde\nabcde\nabcde';
	
	var tests = 
		[{
			'test' : schema.indexOf('d'), 'expected' : new Lib.Point(3, 0)
		},{
			'test' : schema.indexOf('d', schema.indexOf('d') + 1), 'expected' : new Lib.Point(3, 1)
		},{
			'test' : schema.indexOf('a'), 'expected' : new Lib.Point(0, 0)
		},{
			'test' : schema.indexOf('a', schema.indexOf('a', schema.indexOf('a') + 1) + 1), 'expected' : new Lib.Point(0, 2)
		},{
			'test' : schema.indexOf('e'), 'expected' : new Lib.Point(4, 0)
		}];
	for(var i = 0, ilen = tests.length; i < ilen; i++){
		var test = tests[i];
		var to = Lib.MapSchema.schemaIndexToArrayPosition(schema, test.test);
		var from1 = Lib.MapSchema.arrayPositionToSchemaIndex(schema, to);
		var from2 = Lib.MapSchema.arrayPositionToSchemaIndex(schema, test.expected);
		console.log(
			'test' + i,
			{
				'test' : test,
				'to' : to,
				'fromTo' : from1,
				'fromExpected' : from2
			}		
		);
	}
	console.log(
		schema.indexOf('d'),
		schema.indexOf('d', schema.indexOf('d')),
		schema.indexOf('d', 3),
		schema.indexOf('d', 4)
	);
	console.log(
		schema.indexOf('a'),
		schema.indexOf('a', schema.indexOf('a') + 1),
		schema.indexOf('a', schema.indexOf('a', schema.indexOf('a') + 1) + 1)
	);
</script>