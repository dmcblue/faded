var level = {
	width : map_width*blockSize,
	height : map_height*blockSize,
	zombies : 0,
	ghosts : 0,
	nobles : 0,
	candles : 5,
	stewards :0,
	damnedThrones : 1,
	thrones : [{
		classes : ['bloodstone'],
		choiceHeader : 'This is a throne header',
		choiceText : 'Text for a throne message',
		consequenceHeader : 'End game header',
		consequenceText : 'End game text'
	}],
	papers : 
		[new Lib.Message({
			header : 'This is a header',
			text : 'Text for a message',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		})]
}