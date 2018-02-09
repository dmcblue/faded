<?php

class Tools{
	static public function getFile($filepath){
		ob_start();
		require($filepath);
		$content = ob_get_contents();
		ob_end_clean();
		
		return $content;
	}
	
	static public function getJavascriptMultiline($filepath){
		return str_replace(["\r","\n"], ["","\\\n"], self::getFile($filepath));
	}
	
	static public function getLevel($name){
		$filepath = 
			__DIR__.DIRECTORY_SEPARATOR
				.'..'.DIRECTORY_SEPARATOR
				.'levels'.DIRECTORY_SEPARATOR
				.$name.'.js'
		;
		return str_replace(["var level =",], ["",], self::getFile($filepath));
	}
	
	static public function getMap($name){
		$content = 
			file_get_contents(
				__DIR__.DIRECTORY_SEPARATOR
					.'..'.DIRECTORY_SEPARATOR
					.'maps'.DIRECTORY_SEPARATOR
					.$name
			);
		return str_replace(["\n",], ["\\n",], $content);
	}
}