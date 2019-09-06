<div class="block--section block--collapse <?= $data->line()->bool()? 'break': ''; ?>">
	<h2><?= $data->text() ?></h2>
	<div class="collapse--button">+</div>
	<div class="collapse--content">
		<?php foreach($data->children() as $subpage){
		    snippet($subpage->snippet(), ['data' => $subpage]);
		}
		?>
	</div>
</div>