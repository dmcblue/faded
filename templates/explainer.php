<?php
	$stuffs = [
		'Good Stuff*' => [
			[
				'name' => 'Candles',
				'classes' => ['pickup','candle'],
				'description' => 'Candles give you health.'
			],
			[
				'name' => 'Exits',
				'classes' => ['pickup','exit'],
				'description' => 'Escape through these doors to ascend to the next story of the castle.'
			],
			[
				'name' => 'Messages',
				'classes' => ['pickup','paper'],
				'description' => 'Along your way, you may find notes left behind by other explorers attempting to plunder the treasures of the Dread Monarch\\\'s castle.'
			],
		],
		'Bad Stuff' => [
			[
				'name' => 'Zombies',
				'classes' => ['zombie', 'sprite1', 'northeast',],
				'description' => 'The former servants of the Dread Monarch transformed. Follow you slowly and attack you slowly.'
			],
			[
				'name' => 'Nobles',
				'classes' => ['noble', 'sprite1', 'northeast',],
				'description' => 'The aristocratic companions of the Monarch have been transformed into quick, powerful zombies.  They will chase you down but, once they attack, will disappear to a new location.'
			],
			[
				'name' => 'Handmaidens',
				'classes' => ['ghost','borderless', 'sprite1', 'northeast',],
				'description' => 'Those closest to the Dread Monarch have been changed into listless ghosts who notice nothing but their own sorrow.  That said, their very presence will drain your life.'
			],
		]
	];
?>
<table id="explainer">
	<thead>
		<tr>
			<?php foreach($stuffs as $name => $items): ?>
			<th><?php echo $name; ?></th>
			<?php endforeach; ?>
		</tr>
	</thead>
	<tbody>
		<tr>
			<?php foreach($stuffs as $name => $items): ?>
			<td>
				<table>
					<tbody>
						<?php foreach($items as $item): ?>
						<tr>
							<td class="icons"><div class="<?php echo implode(' ', $item['classes']); ?> icon"></div></td>
							<td>
								<h2><?php echo $item['name']; ?></h2>
								<p><?php echo $item['description']; ?></p>
							</td>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</td>
			<?php endforeach; ?>
		</tr>
	</tbody>
</table>
<em>* Press (e) to interact with these objects in the game.</em>