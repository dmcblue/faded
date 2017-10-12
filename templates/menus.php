<?php
	$buttons = [[
		'label' => 'Play',
		'onClick' => '',
	],[
		'label' => 'About',
		'onClick' => '',
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