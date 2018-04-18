var level = {
	width : map_width*blockSize,
	height : map_height*blockSize,
	zombies : 6,
	ghosts : 3,
	nobles : 2,
	candles : 12,
	papers : 
		[new Lib.Message({
			header : '6 of Felbur, 1146',
			text : 'Fire-eater. Fire-eater. Eats the fire. Little fire, little fire. EAT EAT EAT. Til they are all eaten up, the Fire-eater gets BRIGHT BRIGHT BRIGHT. But if it gets DARK DARK DARK, then BOOM.  And all the little fires run away til the Fire-eater wakes up and eats eats eats.<br/><br/>- Marian',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '19 of Bridbur, 951',
			text : 'I mustered power enough to briefly report to the Enclave. But the power here must have sensed it; I can no longer make contact.  I pray, if I do not escape, that my notes will be of use to them.  As I ascending the castle, more dark creatures appeared, all formed from the former inhabitants.  One such are the Handmaidens of the castle.  They have been transformed in to tortured spirits, consumed by grief.  In their sorrow, they do not notice intruders but their mere presence is a danger.  As they passed by, I could feel my life draining and I had to fallback to a safe distance. May they be released from this curse.<br/><br/>- Mage Awalat of the Torin',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '25 of Auvur, 1036',
			text : 'The undead attacked as soon as I entered the castle.  The legends all fall short of the true horrors hidden within these walls.  I tried to run but the monsters were everywhere. I fell. I knew my fate as they ripped apart my flesh.  Then a light filled the room.  Through the blood, I saw a bright figure calling to the undead.  They charged after it, ravenous for another meal, and the figure ran down a hallway.  An inch from death, I passed out.  When I awoke, I found myself in an alcove, hidden from the undead.  How did I get here? As I peered into the long hallway, I saw the bright figure disappearing up a stairwell.  Was it the one who saved me?  Does it know a means of escape? When I regained my strength, I ascended the same steps and have been following its trail ever since.<br/><br/>- T. Sinhuan',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '',
			text : 'The candles, the figure of light all the journals speak of, what do they have to do with this place?  Can I find this person? Can they help me?<br/><br/>What happened here so long ago? Why am I here?',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '9 of Herbsur, 1098',
			text : 'On the second day, I found a library with piles of notes everywhere.  All on subjects of summoning great power; someone seemed desperate, dangerous or mad. Among them I finally found the word I\'ve been searching for all these years, \'Kataban\'. As the notes say, the powerful spirit who resides in the realm of the dead and loves games and wagers.  Anyone who summons Kataban may ask for aid from the spirit\'s powers, which overshadow all magics in the living realms. If I find the source these notes come from, I have found all I shall ever need on this earth!<br/><br/>- Chen ed Dal',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		})],
	mapBuilder :  
		new Lib.MapBuilderRectangle({
			rectangleSize : 10,
			cols : map_width,
			rows : map_height
		}),
	mapPositioner : new Lib.MapItemPositionerRandomV2()
}