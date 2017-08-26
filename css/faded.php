<?php
	header("Content-Type: text/css"); 
	header("X-Content-Type-Options: nosniff");
	
	CONST NL = "\n";
	CONST TAB = "\t";
	
	function sprites($selector, $arr){
		echo NL;
		foreach($arr as $url => $classes){
			echo implode(
				','.NL, 
				array_map(
					function($var) use ($selector){
						return $selector.$var;
					}, 
					$classes
				)
			);
			echo '{'.NL
				.TAB."background:url('images/$url');".NL
				.TAB."background-repeat:no-repeat;".NL
				.TAB."background-size:contain;".NL
				.'}'.NL;
		}
	}
	
	function movable($selector, $stub){
		sprites(
			$selector, 
			array(
				$stub.'_N_1.svg' => 
					array(
						'.sprite1.here',
						'.sprite1.north',
						'.sprite1.south'
					), 
				$stub.'_N_2.svg' => 
					array(
						'.sprite2.here',
						'.sprite2.north',
						'.sprite2.south'
					),
				$stub.'_NE_1.svg' => array('.sprite1.northeast'),
				$stub.'_NE_2.svg' => array('.sprite2.northeast'),
				$stub.'_E_1.svg' => array('.sprite1.east'),
				$stub.'_E_2.svg' => array('.sprite2.east'),
				$stub.'_SE_1.svg' => array('.sprite1.southeast'),
				$stub.'_SE_2.svg' => array('.sprite2.southeast'),
				$stub.'_S_1.svg' => array('.sprite1.south'),
				$stub.'_S_2.svg' => array('.sprite2.south'),
				$stub.'_SW_1.svg' => array('.sprite1.southwest'),
				$stub.'_SW_2.svg' => array('.sprite2.southwest'),
				$stub.'_W_1.svg' => array('.sprite1.west'),
				$stub.'_W_2.svg' => array('.sprite2.west'),
				$stub.'_NW_1.svg' => array('.sprite1.northwest'),
				$stub.'_NW_2.svg' => array('.sprite2.northwest'),
			)
		);
	}
?>

.faded *{
	font-family: 'Fjord One', serif;
	font-size:1rem;
	font-weight:400;
	line-height:1.4rem;
	margin: 0;
	padding: 0;
}

.faded .view{
	position:relative;
	/*box-shadow: inset 0 0 10px rgba(0,0,0,0.2);*/
	background:#000;
	overflow:hidden;
}

.faded .movable,
.faded .pickup{
	position : absolute;
}

.faded .frame{
	display  : block;
	background:#000;
}

.faded .healthbar{
	position :relative;
	width : 1rem;
	height : 100%;
	background : none;
}

.faded .healthbar .health{
	position : absolute;
	bottom : 0;
	width : 100%;
	background : yellow;
}

.faded .character{
	display  : inline-block;
}

.faded .grid table{
	border-collapse:collapse;
	width:100%;
	height:100%;
}

.faded .grid.map td{
	background:#000;
}

.faded .grid.map td.walkable{
	background:#444;
}

.faded .frame.grid.mask{
	position:relative;
	background:transparent;
	z-index:5;
}
.faded .grid.mask td{
	background:rgba(0,0,0,1);
	opacity:0;
}

.faded .player{
	width : 10px;
	height : 10px;
}<?php movable(".faded .player", "Player"); ?>

.faded .zombie{
	width : 10px;
	height : 10px;
}<?php movable(".faded .zombie", "Zombie"); ?>

.faded .noble{
	width : 10px;
	height : 10px;
}<?php movable(".faded .noble", "Noble"); ?>

.faded .ghost{
	width : 10px;
	height : 10px;
	background:#008;
	border:20px solid rgba(0, 0, 230, 0.1);
	border-radius:50%;
	-webkit-background-clip: padding-box; /* for Safari */
    background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */
}

.faded .candle{
	width : 40px;
	height : 40px;
}<?php sprites(
		".faded .candle", 
		array('Candle_1.svg' => array(' '), 'Candle_2.svg' => array('.flicker'))
); ?>

.faded .exit{
	width : 10px;
	height : 10px;
	background:url('images/Exit.svg');
}

.faded .paper{
	width : 10px;
	height : 10px;
	background:url('images/Paper.svg');
}

.faded .message-box{
	position:absolute;
	width:calc(80% - 2rem);
	height:calc(80% - 2rem);
	margin: 10%;
	padding: 1rem;
	z-index:10;
	background:#888;
	
	box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.faded .message-box *{
	color:#212121;
	text-align:left;
}

.faded .message-box h1{
	font-size:1.4rem;
}

.faded .message-box button{
	position:absolute;
	bottom:1rem;
	right:1rem;
	background:transparent;
	text-align:right;
}