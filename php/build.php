<?php
	$BUILD_DIR = __DIR__."/../dist";
	
	$location = $argc > 1 ? $argv[1] : die('No location provided');
	
	function copyDirectoryContents($source, $target, $filter){
		$files = array_diff(scandir($source), array('.', '..'));
		
		foreach($files as $file){
			if(preg_match($filter, $file)){
				copy($source . "/" . $file, $target . "/" . $file);
			}
		}
	}
	
	//https://stackoverflow.com/a/3349792
	function deleteDirectory($directory){
		if(file_exists($directory)){
			$it = new RecursiveDirectoryIterator($directory, RecursiveDirectoryIterator::SKIP_DOTS);
			$files = new RecursiveIteratorIterator($it,
						 RecursiveIteratorIterator::CHILD_FIRST);
			foreach($files as $file) {
				if ($file->isDir()){
					rmdir($file->getRealPath());
				} else {
					unlink($file->getRealPath());
				}
			}
			rmdir($directory);
		}
	}
	
	$getFile = function ($url, $target, $replace = array()){
		$contents = file_get_contents($url);
		$contents = str_replace(array_keys($replace), array_values($replace), $contents);
		file_put_contents($target, $contents);
	};
	
	//delete old build
	deleteDirectory($BUILD_DIR);
	//start new build
	mkdir($BUILD_DIR);
	
	//CSS
	mkdir($BUILD_DIR . "/css");
	$getFile($location . "/css/faded.php", $BUILD_DIR . "/css/faded.css");
	copy(__DIR__.'/../css/style.css', $BUILD_DIR . "/css/style.css");
	mkdir($BUILD_DIR . "/css/images");
	copyDirectoryContents(__DIR__ . "/../css/images", $BUILD_DIR . "/css/images", '/.svg$/');
	
	//JS
	mkdir($BUILD_DIR . "/js");
	$getFile($location . "/js/index.php", $BUILD_DIR . "/js/faded.js");
	
	//Music
	mkdir($BUILD_DIR . "/music");
	copyDirectoryContents(__DIR__ . "/../music", $BUILD_DIR . "/music", '/.mp3/');

	//Index HTML
	$getFile(
		$location . "/index.php", 
		$BUILD_DIR . "/index.html", 
		array(
			'css/faded.php' => 'css/faded.css',
			'js/index.php' => 'js/faded.js',
		)
	);