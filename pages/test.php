<?php

?><h1>Test</h1>
<button onclick="">Hit</button>
<div id="div"></div>
<script>
	var zombie = new Lib.Zombie({selector : 'div'});
	console.log(Lib.MapSchema.getObjectSymbol(zombie));
	
	var map = '<?php echo Tools::getMap('test'); ?>';
	var mapArray = Lib.MapSchema.stringToArray(map);
	console.log(mapArray);
</script>