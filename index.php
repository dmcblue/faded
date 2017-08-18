<?php
    $page = isset($_GET['page']) ? $_GET['page'] : 'main';
?><!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Faded</title>
		
		<link href="https://fonts.googleapis.com/css?family=Fjord+One|Quicksand" rel="stylesheet"> 
		
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/faded.css">
		
		<script src="js/index.php" type="text/javascript"></script>
	</head>
	<body>
		<?php require(__DIR__."/php/$page.php"); ?>
	</body>
</html>