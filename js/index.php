<?php
	header('Content-Type: text/javascript');
	
	$manifest =
		array(
			'Lib' =>
				array(
					'Base',
					'Tools',
					'Type',
					'Keys',
					'OnKeyUpInterface',
					'Message',
					'Game',
					'Level',
					'CEvent',
					'Counter',
					'Point',
					'Rectangle',
					'Target',
					'Item',
					'Button',
					'MessageEvent',
					'MessageBox',
					'PaperMessageBox',
					'ScreenMessageBox',
					'FullScreenMessageBox',
					'MapItem',
					'Movable',
					'Sprite',
					'Frame',
					'View',
					'Grid',
					'MapBuilderInterface',
					'MapBuilderRectangle',
					'MapBuilderFromSchema',
					'MapBuilderRectangleV2',
					'MapBuilderRectangleV3',
					'MapBuilderRectangleV4',
					'MapItemPositionerInterface',
					'MapItemPositionerRandom',
					'MapItemPositionerRandomV2',
					'MapItemPositionerFromSchema',
					'Map',
					'Mask',
					'Character',
					'Player',
					'Mob',
					'Chaser',
					'Zombie',
					'Ghost',
					'Noble',
					'Steward',
					'Pickup',
					'Candle',
					'Exit',
					'Paper',
					'ThroneEvent',
					'Throne',
					'DamnedThrone',
					'HealthBar',
					'MapSchema',
					'MusicPlayer',
					'Preloader',
				),
		);
	
	function build($base, $dir, $manifest = array(), $depth = 1){
		$path = $dir.DIRECTORY_SEPARATOR.$base;
		
		$tab = '';
		for($i = 0; $i < $depth; $i++){
			$tab .= "\t";
		}
		
		
		if(file_exists($path)){
			echo "var $base = (function(){".PHP_EOL;
			
			foreach($manifest as $dir => $file){
				if(is_numeric($dir)){
					build($file, $path, array(), $depth + 1);
				}else{
					build($dir, $path, $file, $depth + 1);
				}
			}
			
			echo $tab."return {".PHP_EOL.$tab."\t"
				.implode(
					",".PHP_EOL.$tab."\t",
					array_map(
						function($file){
							return $file.':'.$file;
						},
						$manifest
					)
				).PHP_EOL.$tab."}";
			echo PHP_EOL."})()".PHP_EOL.PHP_EOL;
		}else{
			$width = 40;
			echo $tab.'/*'.str_pad('*', $width, '*').'*/'.PHP_EOL;
			echo $tab.'/*'.str_pad('Class '.$base, $width, ' ', STR_PAD_BOTH).'*/'.PHP_EOL;
			echo $tab.'/*'.str_pad('*', $width, '*').'*/'.PHP_EOL.PHP_EOL;
			echo $tab
				.str_replace(
					array(PHP_EOL, "\r\n", "\n"), 
					array(PHP_EOL.$tab, PHP_EOL.$tab, PHP_EOL.$tab), 
					file_get_contents($path.'.js')
				).PHP_EOL.PHP_EOL.PHP_EOL.PHP_EOL;
			
		}
	}
	build('Lib', __DIR__, $manifest['Lib']);