var level = {
	width : map_width*blockSize,
	height : map_height*blockSize,
	zombies : 7,
	ghosts : 4,
	nobles : 3,
	candles : 15,
	papers : 
		[new Lib.Message({
			header : '13 of Naivarn, 952',
			text : 'I found Awalat. Put up a mighty fight, from the looks of it.  The young mage would have been Grand Magus in but a few years with such talents; Archmage before long.  The final straw seemed to have been the Nobles.  While the townspeople are merely mindless undead, the nobility of the castle have been transformed into cruelly ravenous creatures.  Their speed is incredible. And as soon as they attack, they disappear, only to charge out of the darkness again.  A foul death for such a noble mage as Awalat.<br/><br/>- Grand Magus Uial of the Torin',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '12 of Auvur, 950',
			text : 'The Monarch has locked the doors to the throne room, warning me the experiments inside were highly dangerous.  Our Majesty has had a more positive mood since finding a strange book in the library.  I have never seen it before, despite wandering those shelves a thousand times.  The Monarch says the book tells of a spirit, Kataban, who may yet save us but may ask a high price.  Our Majesty seems prepared for whatever self-sacrifice is necessary to save the people. My admiration knows no bounds. I inquired about safety and the response was that the power of the four Thrones of the Ancestors would be sufficient. But the Monarch\'s grim expression as the throne room door closed left me feeling uneasy. I said loudly as it shut that I would help in anyway, whatever the danger.<br/><br/>- Steward Maurin',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '29 of Auvur, 950',
			text : 'As I sit in this darkness, my very life flees me in despair. My people forever tormented. The thrones of my ancestors corrupted by the terrible choices that awaits me above.  I cannot face this decision nor the people that I have failed.<br/><br/>- (illegible), Monarch of (illegible)',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '',
			text : 'There is a truth here I cannot admit. As I find more and more details...how many times have I read these words?  I pray it isn\'t true.  Let there be an end to these terrible halls and for all that they contain.',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '2 of Kalsurn, 1099',
			text : 'This place is death. There is nothing here, no treasure, no light.  I hear a pounding above that drives fear into my heart, though I thought there was no more room for terror therein. I fear living a second more in this place but I fear death here may bring a fate still worse.<br/><br/>- Tabar Demburo',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		})],
	mapBuilder :  
		new Lib.MapBuilderRectangle({
			rectangleSize : 10,
			cols : map_width,
			rows : map_height
		}),
	mapPositioner : new Lib.MapItemPositionerRandom()
}