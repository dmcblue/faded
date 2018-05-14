<?php
	require(__DIR__."/php/Tools.php");
    $page = isset($_GET['page']) ? $_GET['page'] : 'main';
	$meta = array(
		'base' => 'http://www.dmcblue.com/faded/',
		'description' => 'Faded, a javascript game.',
		'image' => 'preview.png',
		'title' => 'Faded',
	);
?><!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title><?php echo $meta['title']; ?></title>
		
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="description" content="<?php echo $meta['description']; ?>" />
		<style>
			@-ms-viewport{
				width: device-width;
			}
		</style>
		<link href="favicon.png" rel="shortcut icon" type="image/vnd.microsoft.icon" />
		<!-- END Params -->
		
		<!-- Share Meta -->
			<!-- Open Graph -->
			<meta property="og:title" content="<?php echo $meta['title']; ?>" />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="<?php echo $meta['base']; ?>" />
			<meta property="og:image" content="<?php echo $meta['base']; ?><?php echo $meta['image']; ?>" />
			<meta property="og:description" content="<?php echo $meta['description']; ?>" />
			<meta property="og:locale" content="en_GB" />
			<!-- END Open Graph -->
			
			<!-- Twitter Card -->
			<meta name="twitter:card" content="summary_large_image">
			<meta name="twitter:site" content="<?php echo $meta['base']; ?>">
			<meta name="twitter:creator" content="@dmcblue">
			<meta name="twitter:title" content="<?php echo $meta['title']; ?>">
			<meta name="twitter:description" content="<?php echo $meta['description']; ?>">
			<meta name="twitter:image" content="<?php echo $meta['base']; ?><?php echo $meta['image']; ?>">
			<!-- END Twitter Card -->
		<!-- END Share Meta -->
		
		<link href="https://fonts.googleapis.com/css?family=Fjord+One|Quicksand" rel="stylesheet"> 
		
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link rel="stylesheet" type="text/css" href="css/faded.php">
		
		<script src="js/index.php" type="text/javascript"></script>
	</head>
	<body>
		<?php require(__DIR__."/pages/$page.php"); ?>
	</body>
</html>