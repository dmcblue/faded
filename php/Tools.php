<?php

class Tools{
	static public function getJavascriptMultiline($filepath){
		ob_start();
		require($filepath);
		$content = ob_get_contents();
		ob_end_clean();
		//$content = file_get_contents($filepath);
		return str_replace(["\r","\n"], ["","\\\n"], $content);
	}
}