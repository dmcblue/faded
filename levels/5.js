var level = {
	width : map_width*blockSize,
	height : map_height*blockSize,
	zombies : 6,
	ghosts : 2,
	nobles : 2,
	candles : 10,
	stewards : 1,
	damnedThrones : 1,
	thrones : [{
		classes : ['malachite'],
		choiceHeader : 'Throne of the Conquerer &amp; the Pawn',
		choiceText : 'Accept the offer of the demon Kataban to be his champion and lead his army of undead to conquer the world.',
		consequenceHeader : '',
		consequenceText : 'Giving up your free will, you become a slave to Kataban.  You and the army of undead break free from the castle walls and begin an unstoppable conquest of the world.  After a century of unending war, all of humanity is destroyed and Kataban rules the earth through you. But you remain forever his minion with no will of your own.'
	},{
		classes : ['bloodstone'],
		choiceHeader : 'Throne of the Saint &amp; the Negligent',
		choiceText : 'Sacrifice yourself to break your curse.',
		consequenceHeader : '',
		consequenceText : 'Without the Dread Monarch and freed from Kataban\'s control, the army of undead breaks free of the castle and roams aimlessly across the world.  Consumed with bloodlust, they wreak havok upon the kingdoms of humanity.  The wandering dead continue to be found for centuries to come, remaining a source of fear and myth forevermore.'
	},{
		classes : ['silver'],
		choiceHeader : 'Throne of the Sovereign &amp; the Tyrant',
		choiceText : 'Use the power the demon Kataban has invested in you to throw off his control and take the the undead army for your own ends.',
		consequenceHeader : '',
		consequenceText : 'Delving into the depths of necromancy, you summon the strength to fight Kataban\'s control.  Your army bursts from the castle and goes on a path of destruction across the earth. Only by joining forces in desperation after decades spent on the edge of annihilation, the kingdoms of humanity are able to defeat your army. The Dread Monarch\'s soul is then forever sealed in dungeon, forgotten to time.'
	},{
		classes : ['opal'],
		choiceHeader : 'Throne of the Martyr &amp; the Coward',
		choiceText : 'Reject Kataban\'s offer at your own peril.',
		consequenceHeader : '',
		consequenceText : 'Kataban\'s minion, the Horror, destroys you, the castle and all your former subjects.  It then goes on to another town to force another to summon Kataban and receive his offer of being his champion on earth.'
	}],
	papers : 
		[new Lib.Message({
			header : '31 of Herbsur, 972',
			text : 'I found the book of summoning, finally. But when I opened the page for the great spirit, the word \'Betrayer\' was written by hand over and over upon the instructions.  A loose page stuffed inside contained a passage copied from another book: "From \'Lost Powers of Ancient Ages\': Kataban, ancient demon of trickery, delights in torturing souls with dreadful choices. Beware lest ye call on this evil, for Kataban\'s word, though always kept and true, never fails to contain a hidden damnation for the unwary soul." There is no hope for our village. But truly I would prefer our village perish than to suffer the evils that have taken this place.<br/><br/>- S. Elisi Hedstig',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '17 of Auvur, 950',
			text : 'After two days of rituals, the Monarch burst out of the throne room and worked in the library for two days more, not stopping for sleep.  Then returned to the throne room for an hour more, when I heard yelling within.  I forced the doors open only to find the Monarch, sitting horror stuck on the throne, muttering over and over "The Horror is the servant, Kataban the Lord and we, the fools." I tried to help the Monarch up, but was pushed away as Our Majesty ran from the room. I fell against the throne and a chill coursed through my body.  I hear dreadful noises from below and something wretched is happening within me. Where has Our Monarch gone?  May we yet be saved...<br/><br/>- Steward Maurin',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '14 of Auvur, 950',
			text : 'It has worked! The ritual contacted the spirit and it agreed to summon a vast army of aide. In return, Kataban asked me merely to answer a riddle concerning the question, "Who are you?".  These spirits are strange but it is a small matter if it brings safety to my people.  I make haste now to study the spirit\'s history to best answer the riddle.<br/><br/>- (illegible), Monarch of (illegible)',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '11 of Herbsur, 1098',
			text : 'I found the body of a Grand Magus from the Torin Enclave.  How foolish have I been to enter these halls? If a Grand Magus cannot stand against the evils here, what chance do I have?  I read the Torin\'s journal and I understand why this place is so forgotten. Unable to break the evils here, he spent his last hours setting magical wards to turn the interest of travelers aside from this castle and to warn mages of the dangers within.  This last act delayed him long enough for the Steward to find him and deliver a mortal blow. There is no escape, such will be my fate too I suppose...<br/><br/>s- Chen ed Dal',
			buttons : [Lib.MessageBox.BUTTON_CLOSE]
		}),
		new Lib.Message({
			header : '',
			text : 'Why this fate? What have I done to deserve this? And the people, the steward, the explorer, the mages? For all my efforts, were any saved? After all these endless moments of darkness, I being to ask terrible questions.  Is there such a thing as being saved in this awful world? Do we deserve saving? Is there anything to our lives without our power to force our fates, or do gentle moments and high values hold meaning beyond our cruel ends? This is end, this is the end, this is the end...',
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