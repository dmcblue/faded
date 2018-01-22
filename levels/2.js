var level = {
	width : map_width*blockSize,
	height : map_height*blockSize,
	zombies : 7,
	ghosts : 4,
	nobles : 0,
	candles : 10,
	papers : 
		[new Lib.Message({
			header : '',
			text : 'Why am I here?  Was I explorer like the others? No other explanation. I awoke in the darkness only find the tattered pages of those before me.  What fate did I suffer?  How am I still alive among these horrors?',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),new Lib.Message({
			header : '12 of Naivarn, 952',
			text : 'Indeed, the brief report from Awalat has proved true.  I can only imagine what fate the young mage suffered here.  Wretched undead roam the hallways seeking the rend the flesh of the living.  By their clothing, I fear they are the former denizens of the abandoned town just outside.  But they seem bound by these walls; some power holds them here.  I can sense it is not a benevolent force; evil reigns here.  But if so, why keep such dark creatures restrained here?  Something is unfinished in this castle...<br/><br/>- Grand Magus Uial of the Torin',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),new Lib.Message({
			header : '4 of Auvur, 950',
			text : 'The siege continues.  The Horror is held back only by the gates of the town.  Everyone has been brought within the gates, but I fear we may need to bring everyone inside the castle walls soon. Our beloved Monarch continues searching every possible means to save our people.  Every possible means.  I fear such research will led us to something darker than even the Horror...<br/><br/>- Steward Maurin',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),new Lib.Message({
			header : '30 of Simbur, 1204',
			text : 'I would and have done anything. What parent wouldn\'t, for a sick child? Sicker and sicker each day.  The fables in our town all lead back to the Dread Monarch, a figure meant to scare children when they are unruly.  The story goes that all ill and evil stems from the Dread Monarch, who sacrificed the people for power and immortality centuries ago.  Fables.  But the forest of my grandfather\'s time is turning to swamp and strange noises echo in the night.  The children are getting sick with something fearful and wrong and they do not get better. By following the foulness tainting the land, I found the Dark Castle. I did not really believe it existed. But if it exists, then the the legendary Monarch must as well.  So now I promise and I pray to kill this Dread Monarch and end this wretchedness. For my child.<br/><br/>- Sira tan Ashan',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),new Lib.Message({
			header : '18 of Bridbur, 951',
			text : 'My suspicions were true. There is a demonic presence here, something far beyond human. Whether I have its identity correct remains to be seen. I pray I am wrong. Otherwise, this dark place, these horrors and abominations are only the beginning. My only hope is that I can alert the Enclave in time.<br/><br/>- Mage Awalat of the Torin',
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