<?php
	$buttons = [[
		'label' => 'Play',
		'onClick' => "menus.close();fullScreenMessageBox.open();",
	],[
		'label' => 'About',
		'onClick' => 'menus.next()',
	]];
?>
<table class="menu">
	<tr><td>&nbsp;</td></tr>
	<?php foreach($buttons as $button): ?>
	<tr>
		<td onclick="<?php echo $button['onClick']; ?>"><?php echo $button['label']; ?></td>
	</tr>
	<?php endforeach; ?>
	<tr><td>&nbsp;</td></tr>
</table>