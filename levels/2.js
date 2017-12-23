var level = {
	width : map_width*blockSize,
	height : map_height*blockSize,
	zombies : 1,
	ghosts : 1,
	nobles : 0,
	candles : 10,
	papers : 
		[new Lib.Message({
			header : 'This is a header',
			text : 'Text for a message',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		})]
}