<?php
	$buttons = [[
		'label' => 'Play (e)',
		'onClick' => "fullScreenMessageBox.goto(\'warning\');",
	],[
		'label' => 'About (q)',
		'onClick' => 'fullScreenMessageBox.next()',
	]];
?>
<table class="menu">
	<tr><td>&nbsp;</td></tr>
	<?php foreach($buttons as $button): ?>
	<tr>
		<td onclick="<?php echo $button['onClick']; ?>"><h2><?php echo $button['label']; ?></h2></td>
	</tr>
	<?php endforeach; ?>
	<tr><td>&nbsp;</td></tr>
</table>