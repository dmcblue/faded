var level = {
	width : 12*blockSize,
	height : 12*blockSize,
	zombies : 1,
	ghosts : 0,
	nobles : 0,
	candles : 2,
	damnedThrones : 0,
	papers : 
		[new Lib.Message({
			header : 'Hi message',
			text : 'Message text',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		})],
	thrones : [/*{
		classes : ['malachite'],
		choiceHeader : 'Throne of the Conquerer &amp; the Pawn',
		choiceText : 'Accept the offer of the demon Kataban to be his champion and lead his army of undead to conquer the world.',
		consequenceHeader : '',
		consequenceText : 'Giving up your free will, you become a slave to Kataban.  You and the army of undead break free from the castle walls and begin an unstoppable conquest of the world.  After a century of unending war, all of humanity is destroyed and Kataban rules the earth through you. But you remain forever his minion with no will of your own.'
	}*/],
	mapBuilder :  
		new Lib.MapBuilderFromSchema({
			schema : '<?php echo Tools::getMap("test2"); ?>'
		}),
	mapPositioner : new Lib.MapItemPositionerFromSchema({
		schema : '<?php echo Tools::getMap("test2"); ?>'
	})
}