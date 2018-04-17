var level = {
	width : map_width*blockSize,
	height : map_height*blockSize,
	zombies : 10,
	ghosts : 0,
	nobles : 0,
	candles : 10,
	papers : 
		[new Lib.Message({
			header : '25 of Herbsur, 972',
			text : 'I entered the Dark Castle three days ago with a team 10 strong.  I am alone now.  8 are dead.  Marian is alive, I believe, but we were separated in an attack.  I heard his voice yelling from far away yesterday; I think he has gone mad.  What folie let us to think we could find a power here to save our village?<br/><br/>- S. Elisi Hedstig',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '4 of Felbur, 1146',
			text : 'Marn and Hauran are dead. The rumors of treasures in this abandoned fortress...don\'t matter anymore.  The legions of undead here never tire.  I must keep moving hour after hour to stay ahead of them. The exit...I can\'t find it again. Has it disappeared? Am I crazy?<br/><br/>- Sen Hain',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '',
			text : 'I can feel my life fading...The candles...The candles...',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '17 of Bridbur, 951',
			text : 'On my travels here, I encountered some mercenaries fleeing the carnage.  They spoke of the \'Dread Monarch\' who rose up in the castle during the chaos and who now reigns in darkness and death.  Warriors, experienced on many battlefields, spoke of the Dread Monarch in furtive whispers with downcast faces, carrying a fear which still plagued them. As soon as I entered this dark castle, I could feel a terrible presence and knew their words to be true.<br/><br/>- Mage Awalat of the Torin',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '1 of Kalsurn, 1142',
			text : 'We have successfully entered the \'Dark Castle\'. How many have tried their luck in these halls, hunting for treasures in its belly?  I suspect such adventurers are the only one\'s to enter here in decades.  I feel so proud to walk where so many of my brethren have walked, but where they have failed or fled, I will prevail.<br/><br/>- Romina Hyba',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		})],
	mapBuilder :  
		new Lib.MapBuilderRectangleV2({
			rectangleSize : 8,
			cols : map_width,
			rows : map_height
		}),
	mapPositioner : new Lib.MapItemPositionerRandom()
}